const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSettingsSchema = new mongoose.Schema({
  siteOptions: Object,
  paranoia: Object
  // ... other settings
});

const UserSchema = new mongoose.Schema({
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
  userRank: {
    type: Schema.Types.ObjectId,
    ref: 'UserRank',
  },
  inviteCount: {
    type: Number,
    default: 0
  },
  invitesSent: [{
    type: Schema.Types.ObjectId,
    ref: 'Invite'
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
  canLeech: { type: Boolean, default: true },
  adminComment: String,
  banDate: Date,
  banReason: Number,
  ratioWatchDownload: Number,
  warned: Date,
  warnedTimes: { type: Number, default: 0 },
  communityPass: String,
  settings: UserSettingsSchema,
  forumPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'ForumPost'
  }],
});

module.exports = User = mongoose.model('user', UserSchema);
