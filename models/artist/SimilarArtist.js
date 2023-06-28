const mongoose = require('mongoose');
const { Schema } = mongoose;

const VoteSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    way: {
        type: String,
        enum: ['up', 'down'],
        required: true
    }
}, {_id: false});

const SimilarArtistSchema = new Schema({
    artist_id: {
        type: Number,
        ref: 'Artist', // This should match the model name for artists
        required: true
    },
    similar_artist: {
        similar_id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    },
    votes: {
        type: [VoteSchema],
        default: []
    }
});

module.exports = SimilarArtist = mongoose.model('SimilarArtist', SimilarArtistSchema);
