const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarkRequestSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    request_id: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = BookmarkRequest = mongoose.model('bookmarkRequest', BookmarkRequestSchema);
