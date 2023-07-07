const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumTopicSchema = new Schema({
  thread: {
    type: Schema.Types.ObjectId,
    ref: 'Thread',
    default: null
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isLocked: {
    type: Boolean,
    required: true,
    default: false
  },
  isSticky: {
    type: Boolean,
    required: true,
    default: false
  },
  forum: {
    type: Schema.Types.ObjectId,
    ref: 'Forum',
    required: true
  },
  numPosts: {
    type: Number,
    required: true,
    default: 0
  },
  Ranking: {
    type: Number,
    default: 0
  },
  forumPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'ForumPost'
  }],
  edits: [{
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    }
  }]
}, { timestamps: true});

module.exports = mongoose.model('ForumTopic', forumTopicSchema);