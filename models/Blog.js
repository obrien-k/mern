const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    thread_id: {
        type: Number,
        default: null
    },
    important: {
        type: Boolean,
        default: false
    }
});

module.exports = Blog = mongoose.model('Blog', BlogSchema);