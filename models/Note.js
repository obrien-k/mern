const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  thread: {
    type: Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  visibility: {
    type: String,
    enum: ['public', 'staff'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Note = mongoose.model('Note', NoteSchema);
