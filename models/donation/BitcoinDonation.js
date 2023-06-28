const mongoose = require('mongoose');
const { Schema } = mongoose;

const BitcoinDonationSchema = new Schema({
    bitcoin_address: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

BitcoinDonationSchema.index({ bitcoin_address: 1, amount: 1 });

module.exports = BitcoinDonation = mongoose.model('BitcoinDonation', BitcoinDonationSchema);
