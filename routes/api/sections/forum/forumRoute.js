const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const { asyncHandler } = require("../../../../middleware/asyncHandler");
const Forum = require("../../../../models/forum/Forum");
const forumTopic = require("./forumTopic");

// @route   GET api/forums
// @desc    Get all forums
// @access  Private
router.get(
  "/",
  auth(),
  asyncHandler(async (req, res) => {
    const forums = await Forum.find()
      .sort({ Sort: 1 })
      .populate("forumCategory")
      .populate("forumTopics");
    res.json(forums);
  })
);

// @route   GET api/forums/ids
// @desc    Get all forum IDs
// @access  Private
router.get(
  "/ids",
  auth(),
  asyncHandler(async (req, res) => {
    const forums = await Forum.find({}, { _id: 1 }); // Find all forums, return only _id field
    const forumIds = forums.map((forum) => forum._id); // Map to get an array of forum ids
    res.json(forumIds);
  })
);

// @route   GET api/forums/:forumId/topics
// @desc    Get all forum topics
// @access  Private
router.use(
  "/:forumId/topics",
  (req, res, next) => {
    req.forumId = req.params.forumId;
    req.forumTopicId = req.params.forumTopicId;
    next();
  },
  forumTopic
);

// @route   GET api/forums/:id
// @desc    Get forum by ID
// @access  Private
router.get(
  "/:id",
  auth(),
  asyncHandler(async (req, res) => {
    const forum = await Forum.findById(req.params.id)
      .populate("forumTopics")
      .populate("forumPosts");

    if (!forum) {
      const error = new Error("Forum not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(forum);
  })
);

// @route   POST api/forums
// @desc    Create a new forum
// @access  Private
router.post(
  "/",
  auth(),
  asyncHandler(async (req, res) => {
    const {
      forumCategory,
      sort,
      name,
      description,
      minClassRead,
      minClassWrite,
      minClassCreate,
      autoLock,
      autoLockWeeks,
    } = req.body;

    // Creating a new forum
    const newForum = new Forum({
      forumCategory,
      sort,
      name,
      description,
      minClassRead,
      minClassWrite,
      minClassCreate,
      autoLock,
      autoLockWeeks,
    });

    const forum = await newForum.save();
    res.json(forum);
  })
);

module.exports = router;
