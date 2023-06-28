const forumPollVoteSchema = new Schema({
  TopicID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic',
    required: true
  },
  UserID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
module.exports = forumPollVote = mongoose.model('ForumPollVote', forumPollVoteSchema);