const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContestTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = ContestType = mongoose.model('contestType', ContestTypeSchema);
