const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistTagSchema = new Schema({
    tagId: {
        type: Number,
        required: true
    },
    artistId: {
        type: Number,
        required: true
    },
    positiveVotes: {
        type: Number,
        default: 1
    },
    negativeVotes: {
        type: Number,
        default: 1
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
});

module.exports = ArtistTag = mongoose.model('artistTag', ArtistTagSchema);
