const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    page: {
        type: String,
        enum: ['artist', 'collages', 'requests', 'communities'],
        required: true
    },
    page_id: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    added_time: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String
    },
    edited_user_id: {
        type: Number,
        default: null
    },
    edited_time: {
        type: Date,
        default: null
    }
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);
