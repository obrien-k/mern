const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConcertSchema = new Schema({
    concert_id: {
        type: Number,
        required: true
    },
    topic_id: {
        type: Number,
        required: true
    }
});

module.exports = Concert = mongoose.model('Concert', ConcertSchema);
