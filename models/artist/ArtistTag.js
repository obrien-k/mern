const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistTagSchema = new Schema({
    tag_id: {
        type: Number,
        required: true
    },
    artist_id: {
        type: Number,
        required: true
    },
    positive_votes: {
        type: Number,
        default: 1
    },
    negative_votes: {
        type: Number,
        default: 1
    },
    user_id: {
        type: Number,
        default: null
    }
});

module.exports = ArtistTag = mongoose.model('ArtistTag', ArtistTagSchema);
