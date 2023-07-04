const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
}, {timestamps: true});

module.exports = Consumer = mongoose.model('Consumer', consumerSchema);
