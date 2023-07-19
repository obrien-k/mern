const mongoose = require("mongoose");

const stylesheetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cssUrl: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Stylesheet = mongoose.model("Stylesheet", stylesheetSchema);
