const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumTopicNoteSchema = new Schema({
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true});

module.exports = ForumTopicNote = mongoose.model('forumTopicNote', forumTopicNoteSchema);