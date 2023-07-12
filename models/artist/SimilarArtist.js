const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoteSchema = new Schema(
  {
    user: {
      type: Number,
      required: true,
    },
    way: {
      type: String,
      enum: ["up", "down"],
      required: true,
    },
  },
  { _id: false }
);

const SimilarArtistSchema = new Schema({
  artist: {
    type: Number,
    ref: "Artist",
    required: true,
  },
  similarArtist: {
    similarId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  votes: {
    type: [VoteSchema],
    default: [],
  },
});

module.exports = SimilarArtist = mongoose.model(
  "SimilarArtist",
  SimilarArtistSchema
);
