const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  personal: {
    type: Schema.Types.ObjectId,
    ref: "Personal",
  },
  siteAppearance: {
    type: Schema.Types.ObjectId,
    ref: "SiteAppearance",
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
