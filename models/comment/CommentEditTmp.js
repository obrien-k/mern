const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentEditTmpSchema = new Schema({
    page: {
        type: String,
        enum: ['forums', 'artist', 'collages', 'requests', 'torrents'],
        default: null
    },
    post_id: {
        type: Number,
        default: null
    },
    edit_user: {
        type: Number,
        default: null
    },
    edit_time: {
        type: Date,
        default: null
    },
    body: {
        type: String
    }
});

CommentEditTmpSchema.index({ page: 1, post_id: 1, edit_time: 1 });

module.exports = CommentEditTmp = mongoose.model('CommentEditTmp', CommentEditTmpSchema);
