const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
//const checkPerms = require('../../../../middleware/permissions');
const ForumLastReadTopic = require('../../../../models/forum/ForumLastReadTopic');

// @route   POST api/forums/last-read-topics
// @desc    Mark a topic as read by a user
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { TopicID, PostID } = req.body;

    // Creating new ForumLastReadTopic
    const newLastRead = new ForumLastReadTopic({
      UserID: req.user.id,
      TopicID,
      PostID
    });

    const lastRead = await newLastRead.save();
    res.json(lastRead);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
