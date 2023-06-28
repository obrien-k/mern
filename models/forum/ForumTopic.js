const forumTopicSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  AuthorID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  IsLocked: {
    type: Boolean,
    required: true,
    default: false
  },
  IsSticky: {
    type: Boolean,
    required: true,
    default: false
  },
  ForumID: {
    type: Schema.Types.ObjectId,
    ref: 'Forum',
    required: true
  },
  NumPosts: {
    type: Number,
    required: true,
    default: 0
  },
  LastPostID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumPost',
    required: true
  },
  LastPostTime: {
    type: Date,
    default: Date.now
  },
  LastPostAuthorID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  StickyPostID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumPost',
    default: null
  },
  Ranking: {
    type: Number,
    default: 0
  },
  CreatedTime: {
    type: Date,
    default: Date.now
  }
});
module.exports = ForumTopic = mongoose.model('ForumTopic', forumTopicSchema);
