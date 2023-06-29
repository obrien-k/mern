const mongoose = require('mongoose');
const { Schema } = mongoose;

const DriveSchema = new Schema({
    drive_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    offset: {
        type: String,
        required: true
    }
});

DriveSchema.index({ name: 1 });

module.exports = Drive = mongoose.model('Drive', DriveSchema);
