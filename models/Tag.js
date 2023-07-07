const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  occurrences: {
    type: Number,
    default: 0,
  },
});

module.exports = Tag = mongoose.model("Tag", tagSchema);
