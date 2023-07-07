const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../middleware/asyncHandler");
const Comment = require("../../models/comment/Comment");

// Get all comments
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
  })
);

// Get a single comment
router.get(
  "/:id",
  getComment,
  asyncHandler(async (req, res) => {
    res.json(res.comment);
  })
);

// Create a comment
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const comment = new Comment({
      page: req.body.page,
      page_id: req.body.page_id,
      author: req.body.author,
      body: req.body.body,
    });
    const newComment = await comment.save();
    res.status(201).json(newComment);
  })
);

// Middleware for fetching a single comment by id
async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.comment = comment;
  next();
}

module.exports = router;
