const mongoose = require("mongoose");
const { Schema } = mongoose;

const forumCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  sort: {
    type: Number,
    required: true,
  },
  forums: [
    {
      type: Schema.Types.ObjectId,
      ref: "Forum",
    },
  ],
});

forumCategorySchema.pre("save", async function (next) {
  const forumIds = this.forums;

  if (forumIds && forumIds.length > 0) {
    const forumExists = await mongoose
      .model("Forum")
      .exists({ _id: { $in: forumIds } });
    if (!forumExists) {
      throw new Error("Invalid Forum IDs");
    }
  }

  next();
});

module.exports = ForumCategory = mongoose.model(
  "ForumCategory",
  forumCategorySchema
);
