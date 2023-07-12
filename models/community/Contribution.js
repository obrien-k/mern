const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contributionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    releaseDescription: {
      type: String,
      maxLength: 1000,
    },
    createdAt: {
      type: Date,
      index: true,
    },
    updatedAt: {
      type: Date,
      index: true,
    },
    consumers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Consumer",
      },
    ],
    contributors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contributor",
      },
    ],
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    sizeInBytes: Number,
    type: {
      type: String,
      enum: ["txt", "wav", "pdf", "wmv", "ogg", "lua", "jpg", "png"],
    },
    jsonFile: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Contribution = mongoose.model(
  "Contribution",
  contributionSchema
);
