const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeaturedMerchSchema = new Schema({
    product_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    started: {
        type: Date,
        required: true
    },
    ended: {
        type: Date,
        required: true
    },
    artist_id: {
        type: Number,
        default: 0
    }
});

module.exports = FeaturedMerch = mongoose.model('FeaturedMerch', FeaturedMerchSchema);
