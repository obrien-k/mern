const mongoose = require('mongoose');

const ipBanSchema = new mongoose.Schema({
    fromIP: {
        type: Number,
        required: true
    },
    toIP: {
        type: Number,
        required: true
    }
});

const IpBan = mongoose.model('IpBan', ipBanSchema);

module.exports = IpBan;
