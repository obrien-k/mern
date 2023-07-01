const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSpecificRuleSchema = new Schema({
  ForumID: {
    type: Schema.Types.ObjectId,
    ref: 'forum'
  },
  ThreadID: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic'
  }
});

module.exports = ForumSpecificRule = mongoose.model('forumSpecificRule', forumSpecificRuleSchema);
