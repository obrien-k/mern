const mongoose = require('mongoose');
const { Schema } = mongoose;

const inviteSchema = new Schema({
  InviterID: {
    type: Number,
    required: true,
    default: 0
  },
  InviteKey: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Expires: {
    type: Date,
    required: true,
    default: '0000-00-00 00:00:00'
  },
  Reason: {
    type: String,
    required: true,
    default: ''
  }
});

inviteSchema.index({ Expires: 1 });

module.exports = Invite = mongoose.model('Invite', inviteSchema);