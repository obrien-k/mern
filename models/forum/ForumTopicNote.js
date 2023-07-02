const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumTopicNoteSchema = new Schema({
  ForumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true
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
    type: String
  }
});

module.exports = ForumTopicNote = mongoose.model('forumTopicNote', forumTopicNoteSchema);