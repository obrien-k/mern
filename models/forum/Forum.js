const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSchema = new Schema({
  forumCategory: {
    type: Schema.Types.ObjectId,
    ref: 'forumCategory',
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
    ref: 'forumTopic'
  }],
  forumPosts: {
    type: Schema.Types.ObjectId,
    ref: 'forumPost',
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

module.exports = Forum = mongoose.model('forum', forumSchema);