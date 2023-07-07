const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../../../../middleware/auth");
const { asyncHandler } = require("../../../../middleware/asyncHandler");
const ForumTopic = require("../../../../models/forum/ForumTopic");
const ForumPost = require("../../../../models/forum/ForumPost");
const Forum = require("../../../../models/forum/Forum");
const ForumPoll = require("../../../../models/forum/ForumPoll");
const forumPost = require("./forumPost");

// @route   GET api/forums/:forumId/topics
// @desc    Get all forum topics
// @access  Private
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { forumId } = req.params;

    try {
      const forum = await Forum.findById(forumId).populate("forumTopics");
      res.json(forum.forumTopics);
    } catch (error) {
      console.log("Error in route handler:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
);

// @route   GET api/forums/:forumId/topics/:forumTopicId/posts
// @desc    Get all forum posts for a topic
// @access  Private
router.use(
  "/:forumTopicId/posts",
  (req, res, next) => {
    req.forumId = req.params.forumId;
    req.forumTopicId = req.params.forumTopicId;
    next();
  },
  forumPost
);

// @route   POST api/forums/:forumId/topics
// @desc    Create a new forum topic
// @access  Private
router.post(
  "/",
  (req, res, next) => {
    const forumId = req.params.forumId;
    req.body.forum = forumId;
    next();
  },
  [
    auth(),
    [
      check("title", "Title is required").not().isEmpty(),
      check("forum", "Forum is required").not().isEmpty(),
      check("body", "Body is required").not().isEmpty(),
    ],
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, forum, body, question, answers } = req.body;

    // Check if the specified ForumID exists
    const thisForum = await Forum.findById(forum);
    if (!thisForum) {
      return res.status(404).json({ msg: "Forum not found" });
    }

    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check for Poll
      let pollId = null;
      if (question && answers) {
        const newPoll = new ForumPoll({
          forumTopic: null, // will be set after topic is created
          question,
          answers: [JSON.stringify(answers)], // store answers as JSON string
          featured: null,
          closed: false,
        });
        const poll = await newPoll.save();
        pollId = poll._id;
      }

      // Creating new ForumTopic
      const newTopic = new ForumTopic({
        title,
        author: req.user.id,
        forum: forum,
        isLocked: false,
        isSticky: false,
        lastPostTime: Date.now(),
      });

      // Save the new topic
      const topic = await newTopic.save();

      // If there's a poll, update its TopicID
      if (pollId) {
        const poll = await forumPoll.findById(pollId);
        poll.forumTopic = topic._id;
        await poll.save({ session });
      }

      // Creating the original post with the associated TopicID
      const newPost = new ForumPost({
        forumTopic: topic._id,
        author: req.user.id,
        body,
      });

      // Save the original post
      const originalPost = await newPost.save({ session });

      // Push and send the new topic
      topic.forumPosts.push(originalPost._id);
      await topic.save({ session });

      // Update the parent forum's forumTopics array
      const parentForum = await Forum.findByIdAndUpdate(
        forum,
        { $push: { forumTopics: topic._id } },
        { new: true, session }
      );
      parentForum;
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      const userAgent = req.headers["user-agent"];
      if (
        userAgent &&
        (userAgent.includes("Chrome") ||
          userAgent.includes("Firefox") ||
          userAgent.includes("Safari"))
      ) {
        // Browser request, redirect to new topic's page
        res.redirect(`/private/forums/${forum}/topics/${topic._id}`);
      } else {
        // API request, respond with JSON
        res.status(201).json(topic);
      }
    } catch (error) {
      // If anything goes wrong, abort the transaction
      await session.abortTransaction();
      session.endSession();

      // Send error response
      console.error("Failed to create topic and initial post:", error);
      res.status(500).send("Server Error");
    }
  })
);

// @route   PUT api/forums/:forumId/topics/:id
// @desc    Update a forum topic
// @access  Private
router.put(
  "/:id",
  [auth, [check("Title", "Title is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Title } = req.body;
    const topic = await ForumTopic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ msg: "Topic not found" });
    }

    // Check user
    if (topic.AuthorID.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    topic.Title = Title;
    await topic.save();

    res.json(topic);
  })
);

// @route   DELETE api/forums/topics/:id
// @desc    Delete a forum topic
// @access  Private
router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const topic = await ForumTopic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ msg: "Topic not found" });
    }

    // Check user
    if (topic.AuthorID.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await topic.remove();
    res.json({ msg: "Topic removed" });
  })
);

module.exports = router;
