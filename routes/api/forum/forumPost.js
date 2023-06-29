const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const ForumPost = require('../../models/ForumPost');
const User = require('../../models/User');

// @route   POST api/forumpost
// @desc    Create a forum post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('body', 'Body is required')
        .not()
        .isEmpty(),
      check('topicId', 'Topic ID is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newForumPost = new ForumPost({
        Body: req.body.body,
        TopicID: req.body.topicId,
        AuthorID: req.user.id
      });

      const forumPost = await newForumPost.save();

      res.json(forumPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/forumpost
// @desc    Get all forum posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const forumPosts = await ForumPost.find().sort({ AddedTime: -1 });
    res.json(forumPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/forumpost/:id
// @desc    Get forum post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const forumPost = await ForumPost.findById(req.params.id);
    if (!forumPost) {
      return res.status(404).json({ msg: 'Forum post not found' });
    }

    res.json(forumPost);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Forum post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/forumpost/:id
// @desc    Delete a forum post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const forumPost = await ForumPost.findById(req.params.id);

    if (!forumPost) {
      return res.status(404).json({ msg: 'Forum post not found' });
    }

    // Check user
    if (forumPost.AuthorID.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await forumPost.remove();
    res.json({ msg: 'Forum post removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Forum post not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
