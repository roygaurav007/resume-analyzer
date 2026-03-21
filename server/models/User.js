const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name:           { type: String, required: true, trim: true },
  email:          { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:       { type: String, required: true, minlength: 6 },
  isGuest:        { type: Boolean, default: false },
  guestScans:     { type: Number, default: 0 },
  guestHourStart: { type: Date, default: null },
  dailyScans:     { type: Number, default: 0 },
  dailyScanDate:  { type: Date, default: null },
}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)