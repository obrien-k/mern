const forumSpecificRuleSchema = new Schema({
  ForumID: {
    type: Schema.Types.ObjectId,
    ref: 'Forum'
  },
  ThreadID: {
    type: Schema.Types.ObjectId,
    ref: 'ForumTopic'
  }
  // ... additional fields that describe the rule
});
module.exports = ForumSpecificRule = mongoose.model('ForumSpecificRule', forumSpecificRuleSchema);
