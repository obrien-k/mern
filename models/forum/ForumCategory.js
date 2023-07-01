const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumCategorySchema = new Schema({
  Name: {
    type: String,
    required: true,
    default: ''
  },
  Sort: {
    type: Number,
    required: true
  },
  forums: [{
    type: Schema.Types.ObjectId,
    ref: 'forum'
  }]
});
module.exports = ForumCategory = mongoose.model('forumCategory', forumCategorySchema);
