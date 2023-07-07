const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConcertSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  forumTopic: {
    type: Schema.Types.ObjectId,
    ref: "ForumTopic",
    required: true,
  },
});

module.exports = Concert = mongoose.model("Concert", ConcertSchema);
