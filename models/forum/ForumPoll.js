const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumPollSchema = new Schema({
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answers: {
    type: String,
    required: true
  },
  featured: {
    type: Date,
    required: true,
    default: null
  },
  closed: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = ForumPoll = mongoose.model('forumPoll', forumPollSchema);
