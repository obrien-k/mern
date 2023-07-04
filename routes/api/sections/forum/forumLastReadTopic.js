const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const { asyncHandler } = require('../../../../middleware/asyncHandler');
const ForumLastReadTopic = require('../../../../models/forum/ForumLastReadTopic');

// @route   POST api/forums/last-read-topics
// @desc    Mark a topic as read by a user
// @access  Private
router.post('/', asyncHandler(async (req, res) => {
  const { TopicID, PostID } = req.body;

  // Creating new ForumLastReadTopic
  const newLastRead = new ForumLastReadTopic({
    UserID: req.user.id,
    TopicID,
    PostID
  });

  const lastRead = await newLastRead.save();
  res.json(lastRead);
}));

module.exports = router;
