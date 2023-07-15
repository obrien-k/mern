const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const { MongoServerError } = require("mongodb");
const { check, validationResult } = require("express-validator");
const { asyncHandler } = require("../../../../middleware/asyncHandler");
const auth = require("../../../../middleware/auth");

const Forum = require("../../../../models/forum/Forum");
const ForumTopic = require("../../../../models/forum/ForumTopic");
const ForumPost = require("../../../../models/forum/ForumPost");
const User = require("../../../../models/User");

// @route   api/forums/:forumId/topics/:forumTopicId/posts
// @desc    Create a new forum post
// @access  Private
router.post(
  "/",
  [auth(), [check("body", "Body is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const forumId = req.params.forumId;
    const forumTopicId = req.params.forumTopicId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.body.userId).select("-password");
    const forumTopic = await ForumTopic.findById(forumTopicId);
    const forum = await Forum.findById(forumId);
    if (!forumTopic) {
      return res.status(404).json({ msg: "Forum topic not found" });
    }
    if (!forum) {
      return res.status(404).json({ msg: "Forum not found" });
    }

    // Start a session for the transaction
    const session = await mongoose.startSession();
    let retries = 5; // set maximum number of retries

    while (retries) {
      try {
        session.startTransaction();
        const newForumPost = new ForumPost({
          body: req.body.body,
          forumTopic: forumTopicId,
          author: req.body.userId,
        });

        const forumPost = await newForumPost.save({ session });
        forumTopic.forumPosts.push(forumPost._id);
        // Update the lastPost field in the ForumTopic document
        forumTopic.lastPost = forumPost._id;
        await forumTopic.save({ session });
        // Update the lastTopic field in the Forum document
        await Forum.updateOne(
          { _id: forumId },
          {
            $set: {
              lastTopic: forumTopicId,
            },
          },
          {
            upsert: true,
            session: session,
          }
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(201).json(forumPost);
        break; // break out of the loop if successful
      } catch (error) {
        console.error("Failed to create topic and initial post:", error);
        // If anything goes wrong, abort the transaction and retry
        await session.abortTransaction();

        if (error instanceof MongoServerError && error.code === 112) {
          // WriteConflict error code
          retries -= 1; // decrease retries count
          if (retries === 0) {
            session.endSession();
            return res.status(500).send("Server Error"); // send error response if no retries left
          }
        } else {
          session.endSession();
          return res.status(500).send("Server Error"); // rethrow if it's not a WriteConflict error
        }
      }
    }
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
    }).sort({ createdAt: -1 });
    res.json(forumPosts);
  })
);

// @route   GET api/forums/:forumId/topics/:forumTopicId/posts/:id
// @desc    Get forum post by ID
// @access  Private
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // We populate the AuthorID field to reference the ID for the last post author
    // check here if getting other posts breaks!
    const post = await ForumPost.findById(req.params.id).populate("author");

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
