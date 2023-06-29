const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const checkPerms = require('../../../../middleware/permissions');
const ForumTopicNote = require('../../../../models/forum/ForumTopicNote');

// @route   POST api/forumTopicNote
// @desc    Add a note to a forum topic
// @access  Private
router.post('/', [auth, checkPerms('add_note_to_topic')], async (req, res) => {
  try {
    const { TopicID, Body } = req.body;

    // Creating new ForumTopicNote
    const newTopicNote = new ForumTopicNote({
      TopicID,
      AuthorID: req.user.id,
      Body
    });

    const topicNote = await newTopicNote.save();
    res.json(topicNote);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
