const forumPostSchema = new Schema({
  TopicID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic',
    required: true
  },
  AuthorID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  AddedTime: {
    type: Date,
    default: Date.now
  },
  Body: {
    type: String,
    required: true
  },
  EditedUserID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  EditedTime: {
    type: Date
  }
});
module.exports = ForumPost = mongoose.model('ForumPost', forumPostSchema);