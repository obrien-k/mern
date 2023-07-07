const mongoose = require("mongoose");
const { Schema } = mongoose;

const forumPostSchema = new Schema(
  {
    forumTopic: {
      type: Schema.Types.ObjectId,
      ref: "ForumTopic",
      required: true,
      index: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
      minlength: 1, // minimal validation
      maxlength: 5000, // ^^
    },
    edits: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        time: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = ForumPost = mongoose.model("ForumPost", forumPostSchema);
