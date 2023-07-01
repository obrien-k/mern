const mongoose = require('mongoose');

const geoIpSchema = new mongoose.Schema({
    startIP: {
        type: Number,
        required: true
    },
    endIP: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const GeoIp = mongoose.model('GeoIp', geoIpSchema);

module.exports = GeoIp;
