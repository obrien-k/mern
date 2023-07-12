const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArtistTagSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
    required: true,
  },
  positiveVotes: {
    type: Number,
    default: 1,
  },
  negativeVotes: {
    type: Number,
    default: 1,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = ArtistTag = mongoose.model("ArtistTag", ArtistTagSchema);
