const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarkRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: 'request'
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = BookmarkRequest = mongoose.model('bookmarkRequest', BookmarkRequestSchema);
