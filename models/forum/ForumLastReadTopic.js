const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumLastReadTopicSchema = new Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  TopicID: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic',
    required: true
  },
  PostID: {
    type: Schema.Types.ObjectId,
    ref: 'forumPost',
    required: true
  }
});

module.exports = ForumLastReadTopic = mongoose.model('forumLastReadTopic', forumLastReadTopicSchema);
