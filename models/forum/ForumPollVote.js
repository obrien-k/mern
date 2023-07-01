const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumPollVoteSchema = new Schema({
  TopicID: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true
  },
  UserID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  Vote: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  }
});

module.exports = forumPollVote = mongoose.model('forumPollVote', forumPollVoteSchema);