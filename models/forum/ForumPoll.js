const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumPollSchema = new Schema({
  ForumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true
  },
  Question: {
    type: String,
    required: true
  },
  Answers: {
    type: String,
    required: true
  },
  Featured: {
    type: Date,
    required: true,
    default: null
  },
  Closed: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = ForumPoll = mongoose.model('forumPoll', forumPollSchema);
