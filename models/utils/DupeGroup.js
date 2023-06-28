const mongoose = require('mongoose');
const { Schema } = mongoose;

const DupeGroupSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    comments: {
        type: String
    }
});

module.exports = DupeGroup = mongoose.model('DupeGroup', DupeGroupSchema);
