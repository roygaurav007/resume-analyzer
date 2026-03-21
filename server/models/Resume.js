const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  atsScore: { type: Number, min: 0, max: 100 },
  scoreBreakdown: {
    formatting: Number,
    keywords: Number,
    experience: Number,
    impact: Number,
  },
  sectionScores: {
    summary: Number,
    experience: Number,
    projects: Number,
    skills: Number,
    education: Number,
  },
  overallVerdict: { type: String },
  summary: { type: String },
  whatIsGood: [String],
  whatIsBad: [String],
  criticalChanges: [{ section: String, issue: String, fix: String, priority: String }],
  weaknesses: [{ issue: String, fix: String, severity: String }],
  rewrittenBullets: [mongoose.Schema.Types.Mixed],
  missingKeywords: [String],
  strongPoints: [String],
  topRecommendation: String,
  interviewReadiness: Number,
  interviewReadinessNote: String,
  quickWins: [String],
  roleAlignment: String,
  rawText: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);