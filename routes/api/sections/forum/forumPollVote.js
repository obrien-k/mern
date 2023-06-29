const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const checkPerms = require('../../../middleware/checkPerms');
const ForumPollVote = require('../../../models/ForumPollVote');

// @route   POST api/forumPollVotes
// @desc    Cast a vote in a poll
// @access  Private
router.post('/', [auth, checkPerms('cast_vote')], async (req, res) => {
  try {
    const { TopicID, Vote } = req.body;

    // Creating new ForumPollVote
    const newPollVote = new ForumPollVote({
      UserID: req.user.id,
      TopicID,
      Vote
    });

    const pollVote = await newPollVote.save();
    res.json(pollVote);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
