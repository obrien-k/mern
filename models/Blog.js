const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    thread_id: {
        type: Number,
        default: null
    },
    important: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = Blog = mongoose.model('blog', BlogSchema);