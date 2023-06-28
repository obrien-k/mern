const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarkCollageSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    collage_id: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = BookmarkCollage = mongoose.model('BookmarkCollage', BookmarkCollageSchema);
