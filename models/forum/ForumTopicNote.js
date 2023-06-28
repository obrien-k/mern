const forumTopicNoteSchema = new Schema({
  TopicID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic',
    required: true
  },
  AuthorID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
module.exports = ForumTopicNote = mongoose.model('ForumTopicNote', forumTopicNoteSchema);