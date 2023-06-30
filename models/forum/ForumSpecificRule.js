const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSpecificRuleSchema = new Schema({
  ForumID: {
    type: Schema.Types.ObjectId,
    ref: 'Forum'
  },
  ThreadID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic'
  }
});

module.exports = ForumSpecificRule = mongoose.model('ForumSpecificRule', forumSpecificRuleSchema);
