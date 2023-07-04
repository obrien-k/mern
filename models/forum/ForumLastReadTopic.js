const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumLastReadTopicSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic',
    required: true
  },
  forumPost: {
    type: Schema.Types.ObjectId,
    ref: 'ForumPost',
    required: true
  }
});

module.exports = ForumLastReadTopic = mongoose.model('ForumLastReadTopic', forumLastReadTopicSchema);
