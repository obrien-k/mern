const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const { asyncHandler } = require('../../../../middleware/asyncHandler');
const ForumPollVote = require('../../../../models/forum/ForumPollVote');

// @route   POST api/forums/poll-votes
// @desc    Cast a vote in a poll
// @access  Private
router.post('/', auth, async (req, res) => {
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
