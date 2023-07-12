const express = require("express");
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");
const { asyncHandler } = require("../../../../middleware/asyncHandler");
const auth = require("../../../../middleware/auth");

const ForumTopic = require("../../../../models/forum/ForumTopic");
const ForumPost = require("../../../../models/forum/ForumPost");
const User = require("../../../../models/User");

// @route   POST api/forums/posts
// @desc    Create a new forum post
// @access  Private
router.post(
  "/",
  [
    auth(),
    [
      check("body", "Body is required").not().isEmpty(),
      check("topicId", "Topic ID is required").not().isEmpty(),
    ],
  ],
  asyncHandler(async (req, res) => {
    const { topicId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select("-password");
    const forumTopic = await ForumTopic.findById(topicId);
    if (!forumTopic) {
      return res.status(404).json({ msg: "Forum topic not found" });
    }

    const newForumPost = new ForumPost({
      body: req.body.body,
      forumTopic: topicId,
      author: req.user.id,
    });

    const forumPost = await newForumPost.save();

    forumTopic.numPosts += 1;
    await forumTopic.save();

    res.json(forumPost);
  })
);

// @route   GET api/forums/:forumId/topics/:forumTopicId/posts
// @desc    Get all forum posts for a topic
// @access  Private
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const forumId = req.params.forumId;
    const forumTopicId = req.params.forumTopicId;
    console.log("forumId:", forumId); // Log forumId
    console.log("forumTopicId:", forumTopicId); // Log forumTopicId

    const forumPosts = await ForumPost.find({
      forumTopic: forumTopicId,
    }).sort({ AddedTime: -1 });
    res.json(forumPosts);
  })
);

// @route   GET api/forums/posts/:id
// @desc    Get forum post by ID
// @access  Private
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // We populate the AuthorID field to reference the ID for the last post author
    // check here if getting other posts breaks!
    const post = await ForumPost.findById(req.params.id).populate("AuthorID");

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  })
);

// @route   DELETE api/forums/posts/:id
// @desc    Delete a forum post
// @access  Private
router.delete(
  "/:id",
  auth(),
  asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select("-password");

    const forumPost = await ForumPost.findById(postId);
    if (!forumPost) {
      return res.status(404).json({ msg: "Forum post not found" });
    }

    // Check user
    if (forumPost.AuthorID.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await forumPost.remove();

    const forumTopic = await ForumTopic.findById(forumPost.topicId);
    if (!forumTopic) {
      return res.status(404).json({ msg: "Forum topic not found" });
    }

    forumTopic.numPosts -= 1;
    await forumTopic.save();

    res.json({ msg: "Forum post removed" });
  })
);

module.exports = router;
