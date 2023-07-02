const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSchema = new Schema({
  ForumCategory: {
    type: Schema.Types.ObjectId,
    ref: 'forumCategory',
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
  ForumTopics: [{
    type: Schema.Types.ObjectId,
    ref: 'forumTopic'
  }],
  ForumPosts: {
    type: Schema.Types.ObjectId,
    ref: 'forumPost',
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
}, { timestamps: true});

module.exports = Forum = mongoose.model('forum', forumSchema);