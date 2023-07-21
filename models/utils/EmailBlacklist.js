const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmailBlacklistSchema = new Schema(
  {
    submitter: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = EmailBlacklist = mongoose.model(
  "EmailBlacklist",
  EmailBlacklistSchema
);
