const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  role_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  resolved: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  },
  body: String
});

const Applicant = mongoose.model('applicant', applicantSchema);

module.exports = Applicant;
