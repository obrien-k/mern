const mongoose = require('mongoose');
const { Schema } = mongoose;

const inviteTreeSchema = new Schema({
  UserID: {
    type: Number,
    required: true,
    default: 0
  },
  InviterID: {
    type: Number,
    required: true,
    default: 0
  },
  TreePosition: {
    type: Number,
    required: true,
    default: 1
  },
  TreeID: {
    type: Number,
    required: true,
    default: 1
  },
  TreeLevel: {
    type: Number,
    required: true,
    default: 0
  }
});

inviteTreeSchema.index({ InviterID: 1, UserID: 1 }, { unique: true });

module.exports = InviteTree = mongoose.model('inviteTree', inviteTreeSchema);
