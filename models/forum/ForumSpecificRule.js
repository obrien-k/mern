const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSpecificRuleSchema = new Schema({
  Forum: {
    type: Schema.Types.ObjectId,
    ref: 'forum'
  },
  Thread: {
    type: Schema.Types.ObjectId,
    ref: 'forumTopic'
  }
});

module.exports = ForumSpecificRule = mongoose.model('forumSpecificRule', forumSpecificRuleSchema);
