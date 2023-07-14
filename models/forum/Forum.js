const mongoose = require("mongoose");
const { Schema } = mongoose;

const forumSchema = new Schema(
  {
    forumCategory: {
      type: Schema.Types.ObjectId,
      ref: "ForumCategory",
      required: true,
    },
    sort: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    minClassRead: {
      type: Number,
      required: true,
      default: 0,
    },
    minClassWrite: {
      type: Number,
      required: true,
      default: 0,
    },
    minClassCreate: {
      type: Number,
      required: true,
      default: 0,
    },
    forumTopics: [
      {
        type: Schema.Types.ObjectId,
        ref: "ForumTopic",
      },
    ],
    forumPosts: {
      type: Schema.Types.ObjectId,
      ref: "ForumPost",
    },
    numTopics: {
      type: Number,
      required: true,
      default: 0,
    },
    numPosts: {
      type: Number,
      required: true,
      default: 0,
    },
    autoLock: {
      type: Boolean,
      default: true,
    },
    autoLockWeeks: {
      type: Number,
      required: false,
      default: 4,
    },
    lastPost: {
      type: Schema.Types.ObjectId,
      ref: "ForumPost",
    },
    lastTopic: {
      type: Schema.Types.ObjectId,
      ref: "ForumTopic",
    },
  },
  { timestamps: true }
);

forumSchema.virtual("forumTopicsWithRefs", {
  ref: "ForumTopic",
  localField: "_id",
  foreignField: "forum",
  justOne: false,
});

module.exports = Forum = mongoose.model("Forum", forumSchema);
