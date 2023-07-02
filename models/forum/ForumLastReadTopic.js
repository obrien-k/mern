const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumLastReadTopicSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true
  },
  forumPost: {
    type: Schema.Types.ObjectId,
    ref: 'forumPost',
    required: true
  }
});

module.exports = ForumLastReadTopic = mongoose.model('forumLastReadTopic', forumLastReadTopicSchema);
