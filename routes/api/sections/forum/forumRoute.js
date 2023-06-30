const express = require('express');
const router = express.Router();
const auth = require('../../auth');
//const checkPerms = require('../../../../middleware/permissions');
const Forum = require('../../../../models/forum/Forum');

// @route   GET api/forums
// @desc    Get all forums
// @access  Public
router.get('/', auth('site_leech'), async (req, res) => {
  try {
    const forums = await Forum.find()
      .sort({ Sort: 1 })
      .populate('CategoryID')
      .populate('LastPostAuthorID')
      .populate('LastPostTopicID');
    console.log(forums);
    res.json(forums);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/forums
// @desc    Create a new forum
// @access  Private
router.post('/', checkPerms, async (req, res) => {
  try {
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

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
