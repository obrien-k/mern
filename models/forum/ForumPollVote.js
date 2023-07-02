const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumPollVoteSchema = new Schema({
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
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

module.exports = forumPollVote = mongoose.model('forumPollVote', forumPollVoteSchema);