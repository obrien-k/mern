const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSpecificRuleSchema = new Schema({
  forum: {
    type: Schema.Types.ObjectId,
    ref: 'forum'
  },
  thread: {
    type: Schema.Types.ObjectId,
    ref: 'thread'
  },
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic'
  }
});

module.exports = ForumSpecificRule = mongoose.model('forumSpecificRule', forumSpecificRuleSchema);
