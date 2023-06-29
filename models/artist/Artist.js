const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistSchema = new Schema({
    artist_id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    revision_id: {
        type: Number,
        required: true
    },
    vanity_house: {
        type: Boolean,
        default: false
    },
    last_comment_id: {
        type: Number,
        required: true
    }
});

module.exports = Artist = mongoose.model('Artist', ArtistSchema);
