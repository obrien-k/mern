const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarkArtistSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    artistId: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = BookmarkArtist = mongoose.model('bookmarkArtist', BookmarkArtistSchema);
