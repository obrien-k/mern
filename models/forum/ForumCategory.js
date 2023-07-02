const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    default: ''
  },
  sort: {
    type: Number,
    required: true
  },
  forums: [{
    type: Schema.Types.ObjectId,
    ref: 'forum'
  }]
});

// Pre-save middleware for ForumCategory schema
forumCategorySchema.pre('save', async function (next) {
  const forumIds = this.Forums;

  // Validate that the referenced Forums exist
  const forumExists = await mongoose.model('forum').exists({ _id: { $in: forumIds } });
  if (!forumExists) {
    throw new Error('Invalid Forum IDs');
  }

  next();
});

module.exports = ForumCategory = mongoose.model('forumCategory', forumCategorySchema);
