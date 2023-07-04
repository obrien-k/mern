const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const { asyncHandler } = require('../../../../middleware/asyncHandler');
const ForumPoll = require('../../../../models/forum/ForumPoll');

// @route   POST api/forums/Polls
// @desc    Create a new poll
// @access  Private
router.post('/', auth, asyncHandler(async (req, res) => {
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
}));

module.exports = router;
