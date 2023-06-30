const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumTopicSchema = new Schema({
  thread: {
    type: Schema.Types.ObjectId,
    ref: 'Thread',
    default: null
  },
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

module.exports = mongoose.model('ForumTopic', forumTopicSchema);
