const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = News = mongoose.model('News', NewsSchema);
