const mongoose = require('mongoose');
const { Schema } = mongoose;

const ApiApplicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 50
    }
});

module.exports = ApiApplication = mongoose.model('ApiApplication', ApiApplicationSchema);
