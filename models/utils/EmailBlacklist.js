const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmailBlacklistSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    user_id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = EmailBlacklist = mongoose.model('EmailBlacklist', EmailBlacklistSchema);
