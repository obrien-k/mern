const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumTopicNoteSchema = new Schema({
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic',
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true});

module.exports = ForumTopicNote = mongoose.model('ForumTopicNote', forumTopicNoteSchema);