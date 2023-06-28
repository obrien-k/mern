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
  }
});
module.exports = ForumCategory = mongoose.model('ForumCategory', forumCategorySchema);
