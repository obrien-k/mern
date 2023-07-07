const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: {
    type: String,
    index: true,
  },
  image: {
    type: String,
    required: true,
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
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  registration_status: {
    type: String,
    enum: ["open", "invite", "closed"],
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Music",
      "Applications",
      "E-Books",
      "E-Learning Videos",
      "Audiobooks",
      "Comedy",
      "Comics",
    ],
  },
  staff: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

communitySchema.pre("save", function (next) {
  if (!this.image) {
    switch (this.type) {
      case "Music":
        this.image = "/public/static/common/noartwork/music.png";
        break;
      case "Applications":
        this.image = "/public/static/common/noartwork/applications.png";
        break;
      case "E-Books":
        this.image = "/public/static/common/noartwork/ebooks.png";
        break;
      case "E-Learning Videos":
        this.image = "/public/static/common/noartwork/elearning.png";
        break;
      case "Audiobooks":
        this.image = "/public/static/common/noartwork/audiobooks.png";
        break;
      case "Comedy":
        this.image = "/public/static/common/noartwork/comedy.png";
        break;
      case "Comics":
        this.image = "/public/static/common/noartwork/comics.png";
        break;
      default:
        this.image = "/public/static/common/noartwork/music.png";
    }
  }
  next();
});

communitySchema.index({ consumers: 1 });
communitySchema.index({ contributors: 1 });
communitySchema.index({ groups: 1 });

module.exports = Community = mongoose.model("Community", communitySchema);
