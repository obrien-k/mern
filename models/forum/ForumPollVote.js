const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumPollVoteSchema = new Schema({
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vote: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  }
});

module.exports = forumPollVote = mongoose.model('ForumPollVote', forumPollVoteSchema);