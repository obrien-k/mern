const mongoose = require('mongoose');
const { Schema } = mongoose;

const BadPasswordSchema = new Schema({
    password: {
        type: String,
        required: true
    }
});

module.exports = BadPassword = mongoose.model('BadPassword', BadPasswordSchema);
