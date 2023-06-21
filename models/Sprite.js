const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpriteSchema = new Schema({
  // pseudo model
  moderator: {
    type: Schema.Types.ObjectId,
    ref: 'moderators'
  },
  description: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  thread: {
    type: Schema.Types.ObjectId,
    ref: 'threads'
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
});

module.exports = Sprite = mongoose.model('sprite', SpriteSchema);
