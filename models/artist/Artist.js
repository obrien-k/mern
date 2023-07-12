const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArtistHistorySchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
  editedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  editedAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: false,
  },
});

const ArtistHistory = mongoose.model("ArtistHistory", ArtistHistorySchema);

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  vanityHouse: {
    type: Boolean,
    default: false,
  },
});

ArtistSchema.pre("save", function (next) {
  if (this.isModified()) {
    // Save a copy of the document as it was before the modification
    const history = new ArtistHistory({
      artist: this._id,
      data: this._doc,
      editedBy: currentUser, // make sure currentUser is defined or passed somehow
      description: "Edit made to artist info",
    });
    history.save();
  }
  next();
});

module.exports = Artist = mongoose.model("Artist", ArtistSchema);
