const mongoose = require('mongoose');
const { Schema } = mongoose;

const ThreadSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Thread = mongoose.model('Thread', ThreadSchema);

const ForumThreadSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    forum_topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumTopic',
      required: true
    },
    is_locked: {
      type: Boolean,
      default: false
    },
    is_sticky: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Number,
      default: 0
    },
    last_post_author_id: String,
    no_poll: Boolean,
    sticky_post_id: String,
    author_id: String,
    ranking: String,
    last_post_time: {
      type: Date,
      default: Date.now
    },
    sticky_post: {
      id: String,
      author_id: String,
      added_time: Date,
      body: String,
      edited_user_id: String,
      edited_time: Date,
      username: String
    }
  },
  { discriminatorKey: 'type' }
);

const ForumThread = Thread.discriminator('ForumThread', ForumThreadSchema);

const ApplicationThreadSchema = new Schema({}, { discriminatorKey: 'type' });

const ApplicationThread = Thread.discriminator('ApplicationThread', ApplicationThreadSchema);

module.exports = { Thread, ForumThread, ApplicationThread };
