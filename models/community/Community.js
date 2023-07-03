const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: String,
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  registration_status: {
    type: String,
    enum: ['open', 'invite', 'closed'],
    required: true
  },
  type: {
    type: String,
    enum: ['Music', 'Applications', 'E-Books', 'E-Learning Videos', 'Audiobooks', 'Comedy', 'Comics']
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Community = mongoose.model('Community', communitySchema);