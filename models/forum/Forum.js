const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSchema = new Schema({
  CategoryID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumCategory',
    required: true
  },
  Sort: {
    type: Number,
    required: true
  },
  Name: {
    type: String,
    required: true,
    default: ''
  },
  Description: {
    type: String,
    default: ''
  },
  MinClassRead: {
    type: Number,
    required: true,
    default: 0
  },
  MinClassWrite: {
    type: Number,
    required: true,
    default: 0
  },
  MinClassCreate: {
    type: Number,
    required: true,
    default: 0
  },
  NumTopics: {
    type: Number,
    required: true,
    default: 0
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
  LastPostAuthorID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  LastPostTopicID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic',
    required: true
  },
  LastPostTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  AutoLock: {
    type: Boolean,
    default: true
  },
  AutoLockWeeks: {
    type: Number,
    required: true,
    default: 4
  }
});

module.exports = Forum = mongoose.model('Forum', forumSchema);