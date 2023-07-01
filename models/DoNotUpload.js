const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoNotUploadSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    sequence: {
        type: Number,
        required: true
    }
});

module.exports = DoNotUpload = mongoose.model('doNotUpload', DoNotUploadSchema);
