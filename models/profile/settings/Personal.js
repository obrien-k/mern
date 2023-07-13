const mongoose = require("mongoose");
const { Schema } = mongoose;

const personalSchema = new Schema({
  avatar: {
    type: String,
    required: false,
  },
  avatarMouseoverText: {
    type: String,
    required: false,
  },
  profileTitle: {
    type: String,
    required: false,
  },
  profileInfo: {
    type: String,
    required: false,
  },
});

module.exports = Personal = mongoose.model("Personal", personalSchema);
