const express  = require('express')
const multer   = require('multer')
const path     = require('path')
const fs       = require('fs')
const pdfParse = require('pdf-parse')
const authMiddleware = require('../middleware/authMiddleware')
const { optionalAuth } = require('../middleware/authMiddleware')
const Resume   = require('../models/Resume')
const User     = require('../models/User')
const { analyzeResume } = require('../services/geminiService')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const router   = express.Router()

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Only PDF files allowed'), false),
})

// Upload — works with or without token (auto creates guest session)
router.post('/upload', optionalAuth, upload.single('resume'), async (req, res) => {
  const fp = req.file?.path
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF file' })

    let user = null
    let isGuest = false
    let newGuestToken = null

    if (req.user) {
      // Logged in user (registered or guest)
      user = await User.findById(req.user.id)
      isGuest = req.user.isGuest || false
    } else {
      // No token — auto create a guest session
      const gid    = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
      const email  = `${gid}@guest.resumeai.local`
      const hashed = await bcrypt.hash(gid, 10)
      user = await User.create({
        name: 'Guest User', email, password: hashed,
        isGuest: true, guestScans: 0, guestHourStart: new Date()
      })
      newGuestToken = jwt.sign(
        { id: user._id, name: 'Guest User', email, isGuest: true },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      )
      isGuest = true
    }

    // Rate limiting
    const now = new Date()
    if (isGuest) {
      const hourAgo = new Date(now - 60 * 60 * 1000)
      if (!user.guestHourStart || user.guestHourStart < hourAgo) {
        user.guestScans = 0; user.guestHourStart = now
      }
      if (user.guestScans >= 5) {
        if (fp && fs.existsSync(fp)) fs.unlinkSync(fp)
        return res.status(429).json({ message: 'Guest limit reached — 5 scans/hour. Create a free account for 25/day.', limitType: 'guest' })
      }
      user.guestScans += 1
    } else {
      const sod = new Date(now); sod.setHours(0, 0, 0, 0)
      if (!user.dailyScanDate || new Date(user.dailyScanDate) < sod) {
        user.dailyScans = 0; user.dailyScanDate = now
      }
      if (user.dailyScans >= 25) {
        if (fp && fs.existsSync(fp)) fs.unlinkSync(fp)
        return res.status(429).json({ message: `Daily limit reached — 25 scans/day. Resets at midnight.`, limitType: 'daily', used: user.dailyScans, limit: 25 })
      }
      user.dailyScans += 1
    }
    await user.save()

    const pdfData = await pdfParse(fs.readFileSync(fp))
    const rawText = pdfData.text.trim()
    if (!rawText || rawText.length < 50) {
      if (fp && fs.existsSync(fp)) fs.unlinkSync(fp)
      return res.status(400).json({ message: 'Could not extract text from PDF. Make sure it is not a scanned image.' })
    }

    const a = await analyzeResume(rawText)
    const resume = await Resume.create({
      userId: user._id, fileName: req.file.originalname,
      atsScore: a.atsScore, scoreBreakdown: a.scoreBreakdown, sectionScores: a.sectionScores,
      overallVerdict: a.overallVerdict, summary: a.overallVerdict,
      whatIsGood: a.whatIsGood, whatIsBad: a.whatIsBad, criticalChanges: a.criticalChanges,
      weaknesses: a.weaknesses, rewrittenBullets: a.rewrittenBullets,
      missingKeywords: a.missingKeywords, strongPoints: a.strongPoints,
      topRecommendation: a.topRecommendation, interviewReadiness: a.interviewReadiness,
      interviewReadinessNote: a.interviewReadinessNote, quickWins: a.quickWins,
      roleAlignment: a.roleAlignment, rawText: rawText.substring(0, 3000),
    })
    if (fp && fs.existsSync(fp)) fs.unlinkSync(fp)

    res.status(201).json({
      message: 'Resume analyzed successfully',
      resume,
      // Send guest token if we auto-created a session
      ...(newGuestToken && {
        guestSession: {
          token: newGuestToken,
          user: { id: user._id, name: 'Guest User', email: user.email, isGuest: true }
        }
      }),
      usage: {
        used: isGuest ? user.guestScans : user.dailyScans,
        limit: isGuest ? 5 : 25,
        isGuest
      }
    })
  } catch (err) {
    if (fp && fs.existsSync(fp)) fs.unlinkSync(fp)
    console.error('Upload error:', err)
    res.status(500).json({ message: err.message || 'Failed to analyze resume' })
  }
})

// History — requires auth
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).select('-rawText').sort({ createdAt: -1 })
    const user = await User.findById(req.user.id)
    const now = new Date(); const sod = new Date(now); sod.setHours(0,0,0,0)
    const dailyScans = (!user.dailyScanDate || new Date(user.dailyScanDate) < sod) ? 0 : (user.dailyScans || 0)
    res.json({ resumes, usage: { used: user.isGuest ? (user.guestScans||0) : dailyScans, limit: user.isGuest ? 5 : 25, isGuest: user.isGuest } })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

// Get single — optional auth (guest auto-session can view their own result)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const query = req.user
      ? { _id: req.params.id, userId: req.user.id }
      : { _id: req.params.id }
    const resume = await Resume.findOne(query)
    if (!resume) return res.status(404).json({ message: 'Resume not found' })
    res.json({ resume })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

// Delete — requires auth
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!resume) return res.status(404).json({ message: 'Resume not found' })
    res.json({ message: 'Deleted' })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router