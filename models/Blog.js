const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  threadId: {
    type: Number
  }
});

module.exports = BlogPost = mongoose.model('blogPost', BlogPostSchema);
