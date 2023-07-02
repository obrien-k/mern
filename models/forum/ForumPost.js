const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumPostSchema = new Schema({
  ForumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true,
    index: true
  },
  Author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  Body: {
    type: String,
    required: true,
    minlength: 1, // minimal validation
    maxlength: 5000 // ^^
  },
  Edits: [{
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    time: {
        type: Date
    }
  }]
}, { timestamps: true});

module.exports = ForumPost = mongoose.model('forumPost', forumPostSchema);