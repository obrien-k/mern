const mongoose = require('mongoose');
const { Schema } = mongoose;

const geoipCountrySchema = new Schema({
  StartIP: {
    type: Number,
    required: true,
    unsigned: true
  },
  EndIP: {
    type: Number,
    required: true,
    unsigned: true
  },
  Code: {
    type: String,
    required: true
  }
});

const GeoIPCountry = mongoose.model('GeoIPCountry', geoipCountrySchema);
module.exports = GeoIPCountry;
