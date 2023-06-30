const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const checkPerms = require('../../../../middleware/permissions');
const ForumTopic = require('../../../../models/forum/ForumTopic');
const Forum = require('../../../../models/forum/Forum');

// @route   GET api/forums/topics
// @desc    Get all forum topics
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const forumTopics = await ForumTopic.find().populate('ForumID', 'Name');
    res.json(forumTopics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/forums/topics
// @desc    Create a new forum topic
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { Title, ForumID, Body } = req.body;

    // Check if the specified ForumID exists
    const forum = await Forum.findById(ForumID);
    if (!forum) {
      return res.status(404).json({ msg: 'Forum not found' });
    }

    // Creating the original post
    const newPost = new ForumPost({
      AuthorID: req.user.id,
      ForumID: forum._id,
      Body
    });

    // Save the original post
    const originalPost = await newPost.save();

    // Creating new ForumTopic
    const newTopic = new ForumTopic({
      Title,
      AuthorID: req.user.id,
      ForumID: forum._id,
      LastPostID: originalPost._id, 
      LastPostAuthorID: req.user.id
    });

    // Save the new topic
    const topic = await newTopic.save();

    res.json(topic);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
