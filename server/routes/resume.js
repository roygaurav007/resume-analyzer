const express  = require('express')
const multer   = require('multer')
const path     = require('path')
const fs       = require('fs')
const pdfParse = require('pdf-parse')
const auth     = require('../middleware/authMiddleware')
const Resume   = require('../models/Resume')
const User     = require('../models/User')
const { analyzeResume } = require('../services/geminiService')
const router   = express.Router()

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Only PDF files allowed'), false),
})

router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  const fp = req.file?.path
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF file' })
    const user = await User.findById(req.user.id)
    const now  = new Date()

    if (req.user.isGuest) {
      const hourAgo = new Date(now - 60 * 60 * 1000)
      if (!user.guestHourStart || user.guestHourStart < hourAgo) { user.guestScans = 0; user.guestHourStart = now }
      if (user.guestScans >= 5) { if (fp && fs.existsSync(fp)) fs.unlinkSync(fp); return res.status(429).json({ message: 'Guest limit reached — 5 scans/hour. Create a free account for 25/day.', limitType: 'guest' }) }
      user.guestScans += 1
    } else {
      const sod = new Date(now); sod.setHours(0, 0, 0, 0)
      if (!user.dailyScanDate || new Date(user.dailyScanDate) < sod) { user.dailyScans = 0; user.dailyScanDate = now }
      if (user.dailyScans >= 25) { if (fp && fs.existsSync(fp)) fs.unlinkSync(fp); return res.status(429).json({ message: `Daily limit reached — 25 scans/day. Resets at midnight. Used ${user.dailyScans}/25 today.`, limitType: 'daily', used: user.dailyScans, limit: 25 }) }
      user.dailyScans += 1
    }
    await user.save()

    const pdfData = await pdfParse(fs.readFileSync(fp))
    const rawText = pdfData.text.trim()
    if (!rawText || rawText.length < 50) return res.status(400).json({ message: 'Could not extract text from PDF. Make sure it is not a scanned image.' })

    const a = await analyzeResume(rawText)
    const resume = await Resume.create({
      userId: req.user.id, fileName: req.file.originalname,
      atsScore: a.atsScore, scoreBreakdown: a.scoreBreakdown, sectionScores: a.sectionScores,
      overallVerdict: a.overallVerdict, summary: a.overallVerdict,
      whatIsGood: a.whatIsGood, whatIsBad: a.whatIsBad, criticalChanges: a.criticalChanges,
      weaknesses: a.weaknesses, rewrittenBullets: a.rewrittenBullets,
      missingKeywords: a.missingKeywords, strongPoints: a.strongPoints,
      topRecommendation: a.topRecommendation, interviewReadiness: a.interviewReadiness,
      interviewReadinessNote: a.interviewReadinessNote, quickWins: a.quickWins,
      roleAlignment: a.roleAlignment, rawText: rawText.substring(0, 3000),
    })
    fs.unlinkSync(fp)
    res.status(201).json({ message: 'Resume analyzed successfully', resume, usage: { used: req.user.isGuest ? user.guestScans : user.dailyScans, limit: req.user.isGuest ? 5 : 25, isGuest: req.user.isGuest } })
  } catch (err) {
    if (fp && fs.existsSync(fp)) fs.unlinkSync(fp)
    console.error('Upload error:', err)
    res.status(500).json({ message: err.message || 'Failed to analyze resume' })
  }
})

router.get('/history', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).select('-rawText').sort({ createdAt: -1 })
    const user = await User.findById(req.user.id)
    const now = new Date(); const sod = new Date(now); sod.setHours(0,0,0,0)
    const dailyScans = (!user.dailyScanDate || new Date(user.dailyScanDate) < sod) ? 0 : (user.dailyScans || 0)
    res.json({ resumes, usage: { used: user.isGuest ? (user.guestScans||0) : dailyScans, limit: user.isGuest ? 5 : 25, isGuest: user.isGuest } })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id })
    if (!resume) return res.status(404).json({ message: 'Resume not found' })
    res.json({ resume })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!resume) return res.status(404).json({ message: 'Resume not found' })
    res.json({ message: 'Deleted' })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router