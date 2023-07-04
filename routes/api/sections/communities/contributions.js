const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const { asyncHandler } = require('../../../../middleware/asyncHandler');
const Contribution = require('../../../../models/community/Contribution'); // Import the Contribution model

// @route   GET api/contributions
// @desc    Get all contributions
// @access  Public
router.get('/', auth(), asyncHandler(async (req, res) => {
  const contributions = await Contribution.find();
  res.json(contributions);
}));

// @route   POST api/contributions
// @desc    Create a new contribution
// @access  Private
router.post('/', auth(), asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming the auth middleware attaches the user to req.user
  const { group, name, description, type, consumers, collaborators, comments, size } = req.body;

  if (!group) {
    return res.status(400).json({ msg: 'Group is required' });
  }

  // Creating a new contribution
  const newContribution = new Contribution({
    user: userId,
    group,
    name,
    description,
    type,
    consumers,
    collaborators,
    comments,
    size
  });

  const contribution = await newContribution.save();
  res.json(contribution);
}));

module.exports = router;
