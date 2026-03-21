const express = require('express')
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const User    = require('../models/User')
const router  = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Please fill in all fields' })
    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 10)
    const user   = await User.create({ name, email, password: hashed })
    const token  = jwt.sign(
      { id: user._id, name: user.name, email: user.email, isGuest: false },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.status(201).json({
      message: 'Account created',
      token,
      user: { id: user._id, name: user.name, email: user.email, isGuest: false }
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Please fill in all fields' })

    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid email or password' })

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, isGuest: false },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, isGuest: false }
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/guest', async (req, res) => {
  try {
    const gid    = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
    const email  = `${gid}@guest.resumeai.local`
    const hashed = await bcrypt.hash(gid, 10)
    const user   = await User.create({
      name: 'Guest User', email, password: hashed,
      isGuest: true, guestScans: 0, guestHourStart: new Date()
    })
    const token = jwt.sign(
      { id: user._id, name: 'Guest User', email, isGuest: true },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )
    res.status(201).json({
      message: 'Guest session created',
      token,
      user: { id: user._id, name: 'Guest User', email, isGuest: true }
    })
  } catch (err) {
    console.error('Guest error:', err)
    res.status(500).json({ message: 'Failed to create guest session' })
  }
})

module.exports = router