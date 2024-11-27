const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  assessment_start_time: {
    type: Date,
    required: true,
  },
  assessment_end_time: {
    type: Date,
    default: null,
  },
  total_duration: {
    type: Number, // Duration in milliseconds
    default: null,
  },
  fork_url: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Assessment', AssessmentSchema);