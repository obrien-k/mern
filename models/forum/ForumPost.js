const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumPostSchema = new Schema({
  TopicID: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true,
    index: true
  },
  AuthorID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  AddedTime: {
    type: Date,
    default: Date.now
  },
  Body: {
    type: String,
    required: true,
    minlength: 1, // minimal validation
    maxlength: 5000 // ^^
  },
  EditedUserID: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  EditedTime: [{
    type: Date
  }]
});

module.exports = ForumPost = mongoose.model('forumPost', forumPostSchema);