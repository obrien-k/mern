const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeaturedAlbumSchema = new Schema({
    group_id: {
        type: Number,
        required: true
    },
    thread_id: {
        type: Number,
        required: true
    },
    title: {
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
    }
});

module.exports = FeaturedAlbum = mongoose.model('featuredAlbum', FeaturedAlbumSchema);
