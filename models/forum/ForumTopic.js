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
  Author: {
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
  Forum: {
    type: Schema.Types.ObjectId,
    ref: 'forum',
    required: true
  },
  NumPosts: {
    type: Number,
    required: true,
    default: 0
  },
  LastPost: {
    type: Schema.Types.ObjectId,
    ref: 'forumPost',
  },
  Ranking: {
    type: Number,
    default: 0
  },
  ForumPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'forumPost'
  }],
}, { timestamps: true});

module.exports = mongoose.model('forumTopic', forumTopicSchema);
