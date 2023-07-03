const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendSchema = new Schema({
  UserID: {
    type: Number,
    required: true,
    unsigned: true
  },
  FriendID: {
    type: Number,
    required: true,
    unsigned: true
  },
  Comment: {
    type: String,
    required: true
  }
});

module.exports = Friend = mongoose.model('Friend', friendSchema);

