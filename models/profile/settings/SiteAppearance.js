const mongoose = require("mongoose");
const { Schema } = mongoose;

const siteAppearanceSchema = new Schema({
  stylesheet: {
    type: String,
    required: true,
    default: "cayer_make",
  },
  externalStylesheetUrl: {
    type: String,
    required: false,
  },
  styledTooltips: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = SiteAppearance = mongoose.model(
  "SiteAppearance",
  siteAppearanceSchema
);
