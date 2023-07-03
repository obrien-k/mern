const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  description: String,
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },
  consumers: [{
    type: Schema.Types.ObjectId,
    ref: 'Consumer'
  }],
  contributor: {
    type: Schema.Types.ObjectId,
    ref: 'Contributor'
  }
}, { timestamps: true});

module.exports = Group = mongoose.model('Group', groupSchema);