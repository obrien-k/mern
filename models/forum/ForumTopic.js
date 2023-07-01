const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumTopicSchema = new Schema({
  Thread: {
    type: Schema.Types.ObjectId,
    ref: 'thread',
    default: null
  },
  Title: {
    type: String,
    required: true
  },
  AuthorID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
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
    ref: 'forum',
    required: true
  },
  NumPosts: {
    type: Number,
    required: true,
    default: 0
  },
  LastPostID: {
    type: Schema.Types.ObjectId,
    ref: 'forumPost',
  },
  LastPostTime: {
    type: Date,
    default: Date.now
  },
  LastPostAuthorID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  StickyPostID: {
    type: Schema.Types.ObjectId,
    ref: 'forumPost',
    default: null
  },
  Ranking: {
    type: Number,
    default: 0
  },
  CreatedTime: {
    type: Date,
    default: Date.now
  },
  ForumPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'forumPost'
  }],
});

module.exports = mongoose.model('forumTopic', forumTopicSchema);
