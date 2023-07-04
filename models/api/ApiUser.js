const mongoose = require('mongoose');
const { Schema } = mongoose;

const ApiUserSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    apiApplication: {
        type: Schema.Types.ObjectId,
        ref: 'ApiApplication',
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: Number,
        required: true,
        enum: [0, 1] 
    },
    time: {
        type: Date,
        default: Date.now
    },
    access: {
        type: String,
        required: true
    }
});

module.exports = ApiUser = mongoose.model('ApiUser', ApiUserSchema);
