const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSpecificRuleSchema = new Schema({
  forum: {
    type: Schema.Types.ObjectId,
    ref: 'Forum'
  },
  thread: {
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  },
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic'
  }
});

module.exports = ForumSpecificRule = mongoose.model('ForumSpecificRule', forumSpecificRuleSchema);
