const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const checkPerms = require('../../../middleware/checkPerms');
const ForumTopic = require('../../../models/ForumTopic');

// @route   POST api/forumTopic
// @desc    Create a new forum topic
// @access  Private
router.post('/', [auth, checkPerms('create_forum_topic')], async (req, res) => {
  try {
    const { Title, ForumID } = req.body;

    // Creating new ForumTopic
    const newTopic = new ForumTopic({
      Title,
      AuthorID: req.user.id,
      ForumID,
      LastPostID: null, // or provide the appropriate ID
      LastPostAuthorID: req.user.id
    });

    const topic = await newTopic.save();
    res.json(topic);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
