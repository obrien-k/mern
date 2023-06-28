const forumLastReadTopicSchema = new Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  TopicID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic',
    required: true
  },
  PostID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumPost',
    required: true
  }
});
module.exports = ForumLastReadTopic = mongoose.model('ForumLastReadTopic', forumLastReadTopicSchema);
