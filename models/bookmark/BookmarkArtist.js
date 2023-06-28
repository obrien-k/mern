const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarkArtistSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    artist_id: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = BookmarkArtist = mongoose.model('BookmarkArtist', BookmarkArtistSchema);
