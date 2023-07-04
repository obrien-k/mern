const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const { asyncHandler } = require('../../../../middleware/asyncHandler');
const Community = require('../../../../models/community/Community');
const Group = require('../../../../models/community/Group'); // Import the Group model

// @route   GET api/communities
// @desc    Get all communities
// @access  Public
router.get('/', auth(), asyncHandler(async (req, res) => {
  const communities = await Community.find();
  console.log(communities);
  res.json(communities);
}));

// @route   POST api/communities
// @desc    Create a new community
// @access  Private
router.post('/', asyncHandler(async (req, res) => {
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
}));

// @route   GET api/communities/:communityId/groups
// @desc    Get all groups within a community
// @access  Public
router.get('/:communityId/groups', auth(), asyncHandler(async (req, res) => {
  const { communityId } = req.params;
  const groups = await Group.find({ community: communityId }).populate('community', 'name');
  res.json(groups);
}));

// @route   POST api/communities/:communityId/groups
// @desc    Create a new group within a community
// @access  Private
router.post('/:communityId/groups', asyncHandler(async (req, res) => {
  const { communityId } = req.params;
  const { title, tags, description, contributors, type } = req.body;

  // Input Validation
  if (!title || !tags || !description || !contributors || !type) {
    return res.status(400).json({ msg: 'Please include all required fields' });
  }

  // Check if community exists
  const community = await Community.findById(communityId);
  if (!community) {
    return res.status(404).json({ msg: 'Community not found' });
  }

  // Creating a new group
  const newGroup = new Group({
    title,
    tags,
    description,
    community: communityId,
    contributors,
    type
  });

  const group = await newGroup.save();

  // Optionally, you can add the newly created group to the community's groups array
  community.groups.push(group._id);
  await community.save();

  // Use status 201 for resource creation
  res.status(201).json(group);
}));

module.exports = router;