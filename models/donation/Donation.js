const mongoose = require('mongoose');
const { Schema } = mongoose;

const DonationSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    source: {
        type: String,
        default: ''
    },
    reason: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        default: 0
    },
    added_by: {
        type: Number,
        default: 0
    },
    total_rank: {
        type: Number,
        default: 0
    }
});

DonationSchema.index({ user_id: 1 });
DonationSchema.index({ time: 1 });
DonationSchema.index({ amount: 1 });

module.exports = Donation = mongoose.model('Donation', DonationSchema);
