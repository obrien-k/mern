const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const checkPerms = require('../../../../middleware/permissions');
const ForumPoll = require('../../../../models/forum/ForumPoll');

// @route   POST api/forums/Polls
// @desc    Create a new poll
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { TopicID, Question, Answers, Featured } = req.body;

    // Creating a new poll
    const newPoll = new ForumPoll({
      TopicID,
      Question,
      Answers,
      Featured
    });

    const poll = await newPoll.save();
    res.json(poll);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
