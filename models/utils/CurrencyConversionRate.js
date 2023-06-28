const mongoose = require('mongoose');
const { Schema } = mongoose;

const CurrencyConversionRateSchema = new Schema({
    currency: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        default: null
    },
    time: {
        type: Date,
        default: null
    }
});

module.exports = CurrencyConversionRate = mongoose.model('CurrencyConversionRate', CurrencyConversionRateSchema);
