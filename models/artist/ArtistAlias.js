const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArtistAliasSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  redirect: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = ArtistAlias = mongoose.model("ArtistAlias", ArtistAliasSchema);
