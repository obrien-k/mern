const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoverArtSchema = new Schema({
    group_id: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    summary: {
        type: String,
        default: null
    },
    user_id: {
        type: Number,
        default: 0
    },
    time: {
        type: Date,
        default: null
    }
});

CoverArtSchema.index({ group_id: 1, image: 1 }, { unique: true });

module.exports = CoverArt = mongoose.model('coverArt', CoverArtSchema);
