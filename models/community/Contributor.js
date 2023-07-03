const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },
  contributions: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }]
}, { timestamps: true });

module.exports = Contributor = mongoose.model('Contributor', contributorSchema);