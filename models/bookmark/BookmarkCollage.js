const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarkCollageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    collage: {
        type: Schema.Types.ObjectId,
        ref: 'collage'
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = BookmarkCollage = mongoose.model('bookmarkCollage', BookmarkCollageSchema);
