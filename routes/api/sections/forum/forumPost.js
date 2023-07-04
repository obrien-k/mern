const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { asyncHandler } = require('../../../../middleware/asyncHandler');
const auth = require('../../../../middleware/auth');

const ForumPost = require('../../../../models/forum/ForumPost');
const User = require('../../../../models/User');

// @route   POST api/forums/posts
// @desc    Create a forum post
// @access  Private
router.post(
  '/',
  [ auth(),
    [
      check('body', 'Body is required')
        .not()
        .isEmpty(),
      check('topicId', 'Topic ID is required')
        .not()
        .isEmpty()
    ]
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');

    const newForumPost = new ForumPost({
      Body: req.body.body,
      TopicID: req.body.topicId,
      AuthorID: req.user.id
    });

    const forumPost = await newForumPost.save();

    res.json(forumPost);
  }
));

// @route   GET api/forums/posts
// @desc    Get all forum posts
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  const forumPosts = await ForumPost.find().sort({ AddedTime: -1 });
  res.json(forumPosts);
}));

// @route   GET api/forums/posts/:id
// @desc    Get forum post by ID
// @access  Private
router.get('/posts/:id', asyncHandler(async (req, res) => {
  // We populate the AuthorID field to reference the ID for the last post author
  // check here if getting other posts breaks!
  const post = await ForumPost.findById(req.params.id).populate('AuthorID');
  
  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }
  
  res.json(post);
}));


// @route   DELETE api/forums/posts/:id
// @desc    Delete a forum post
// @access  Private
router.delete('/:id', auth(), asyncHandler(async (req, res) => {
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
}));

module.exports = router;