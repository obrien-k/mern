const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const Community = require('../../../../models/community/Community');
const Group = require('../../../../models/community/Group'); // Import the Group model

// @route   GET api/communities
// @desc    Get all communities
// @access  Public
router.get('/', auth(), async (req, res, next) => {
  try {
    const communities = await Community.find();
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
      groups,
      comments,
      registration_status,
      type,
      staff
    } = req.body;

    // Creating a new community
    const newCommunity = new Community({
      name,
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

// @route   GET api/communities/:communityId/groups
// @desc    Get all groups within a community
// @access  Public
router.get('/:communityId/groups', auth(), async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const groups = await Group.find({ community: communityId }).populate('community', 'name');
    console.log(groups);
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   POST api/communities/:communityId/groups
// @desc    Create a new group within a community
// @access  Private
router.post('/:communityId/groups', auth(), async (req, res) => {
  try {
    const { communityId } = req.params;
    const { name, description, consumers, contributor } = req.body;

    // Creating a new group
    const newGroup = new Group({
      name,
      description,
      community: communityId,
      consumers,
      contributor
    });

    const group = await newGroup.save();
    res.json(group);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

module.exports = router;
