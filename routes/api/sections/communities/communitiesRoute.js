const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const { Community } = require('../../../../models/community/Community');

// @route   GET api/communities
// @desc    Get all communities
// @access  Public
router.get('/', auth(), async (req, res, next) => {
  try {
    const communities = await Community.find()
      .populate('consumers')
      .populate('contributors')
      .populate('groups')
      .populate('comments')
      .populate('staff');
    console.log(communities);
    res.json(communities);
  } catch (err) {
    next(err);
  }
});

// @route   POST api/communities
// @desc    Create a new community
// @access  Private
router.post('/', auth(), async (req, res) => {
  try {
    const {
      name,
      consumers,
      contributors,
      groups,
      comments,
      registration_status,
      type,
      staff
    } = req.body;

    // Creating a new community
    const newCommunity = new Community({
      name,
      consumers,
      contributors,
      groups,
      comments,
      registration_status,
      type,
      staff
    });

    const community = await newCommunity.save();
    res.json(community);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
