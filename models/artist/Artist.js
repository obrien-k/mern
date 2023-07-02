const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistSchema = new Schema({
    artistId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    revisionId: {
        type: Number,
        required: true
    },
    vanityHouse: {
        type: Boolean,
        default: false
    },
    lastCommentId: {
        type: Number,
        required: true
    }
});

module.exports = Artist = mongoose.model('artist', ArtistSchema);
