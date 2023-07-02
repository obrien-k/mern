const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarkCommunitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'group'
    },
    time: {
        type: Date,
        required: true
    },
    sort: {
        type: Number,
        default: 0
    }
});

BookmarkCommunitySchema.index({ group_id: 1, user_id: 1 }, { unique: true });

module.exports = BookmarkCommunity = mongoose.model('bookmarkCommunity', BookmarkCommunitySchema);
