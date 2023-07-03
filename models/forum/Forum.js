const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSchema = new Schema({
  forumCategory: {
    type: Schema.Types.ObjectId,
    ref: 'ForumCategory',
    required: true
  },
  sort: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  minClassRead: {
    type: Number,
    required: true,
    default: 0
  },
  minClassWrite: {
    type: Number,
    required: true,
    default: 0
  },
  minClassCreate: {
    type: Number,
    required: true,
    default: 0
  },
  forumTopics: [{
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic'
  }],
  forumPosts: {
    type: Schema.Types.ObjectId,
    ref: 'ForumPost',
  },
  autoLock: {
    type: Boolean,
    default: true
  },
  autoLockWeeks: {
    type: Number,
    required: true,
    default: 4
  }
}, { timestamps: true});

module.exports = Forum = mongoose.model('Forum', forumSchema);