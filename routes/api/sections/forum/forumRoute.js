const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const { asyncHandler } = require('../../../../middleware/asyncHandler');
const Forum = require('../../../../models/forum/Forum');

// @route   GET api/forums
// @desc    Get all forums
// @access  Public
router.get('/', auth(), asyncHandler(async (req, res) => {
  const forums = await Forum.find()
    .sort({ Sort: 1 })
    .populate('forumCategory')
    .populate('forumTopics')
    .populate('forumPosts');
  console.log(forums);
  res.json(forums);
}));

// @route   POST api/forums
// @desc    Create a new forum
// @access  Private
router.post('/', auth(), asyncHandler(async (req, res) => {
  const {
    CategoryID,
    Sort,
    Name,
    Description,
    MinClassRead,
    MinClassWrite,
    MinClassCreate,
    AutoLock,
    AutoLockWeeks,
  } = req.body;

  // Creating a new forum
  const newForum = new Forum({
    CategoryID,
    Sort,
    Name,
    Description,
    MinClassRead,
    MinClassWrite,
    MinClassCreate,
    AutoLock,
    AutoLockWeeks,
  });

  const forum = await newForum.save();
  res.json(forum);
}));

module.exports = router;
