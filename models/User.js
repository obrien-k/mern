const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  userRole: {
    type: String,
    enum: ['User', 'Member', 'Power User', 'VIP', 'Moderator', 'SysOp'],
    default: 'User'
  },
  inviteCount: {
    type: Number,
    default: 0
  },
  invitesSent: [{
    email: String,
    dateSent: Date,
    redeemed: Boolean
  }],
  uploaded: {
    type: Number,
    default: 0
  },
  downloaded: {
    type: Number,
    default: 0
  },
  ratio: {
    type: Number,
    default: 1
  },
  lastLogin: {
    type: Date
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isArtist: {
    type: Boolean,
    default: false
  },
  isDonor: {
    type: Boolean,
    default: false
  },
  invitesSent: [InviteSchema],
  settings: UserSettingsSchema
});

const InviteSchema = new mongoose.Schema({
  email: String,
  dateSent: Date,
  redeemed: Boolean
});

const UserSettingsSchema = new mongoose.Schema({
  siteOptions: Object,
  paranoia: Object
  // ... other settings
});

module.exports = User = mongoose.model('user', UserSchema);
