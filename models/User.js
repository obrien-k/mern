const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSettingsSchema = new mongoose.Schema({
  siteAppearance: {
    type: Schema.Types.ObjectId,
    ref: "SiteAppearance",
  },
  paranoia: {
    type: Schema.Types.ObjectId,
    ref: "Paranoia",
  },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
      match: /^[A-Za-z0-9]+$/, // This regex only allows alphanumeric characters
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    userRank: {
      type: Schema.Types.ObjectId,
      ref: "UserRank",
    },
    inviteCount: {
      type: Number,
      default: 0,
    },
    invitesSent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Invite",
      },
    ],
    uploaded: {
      type: Number,
      default: 0,
    },
    downloaded: {
      type: Number,
      default: 0,
    },
    ratio: {
      type: Number,
      default: 1,
    },
    lastLogin: {
      type: Date,
    },
    dateRegistered: {
      type: Date,
      default: Date.now,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isArtist: {
      type: Boolean,
      default: false,
    },
    isDonor: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
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
    forumPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "ForumPost",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.virtual("effectiveAvatar").get(function () {
  return (
    this.avatar ||
    this.profile.personal.avatar ||
    "/static/common/avatars/default.jpg"
  );
});

module.exports = User = mongoose.model("User", UserSchema);
