const mongoose = require('mongoose');
const { Schema } = mongoose;

const inviteSchema = new Schema({
  InviterID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
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
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  },
  Reason: {
    type: String,
    required: true,
    default: ''
  }
});

inviteSchema.index({ Expires: 1 });

module.exports = Invite = mongoose.model('invite', inviteSchema);
