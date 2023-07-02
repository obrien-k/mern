const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConcertSchema = new Schema({
    concertId: {
        type: Number,
        required: true
    },
    topicId: {
        type: Number,
        required: true
    }
});

module.exports = Concert = mongoose.model('concert', ConcertSchema);
