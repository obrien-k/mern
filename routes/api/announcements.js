const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../middleware/asyncHandler");
const News = require("../../models/News");
const BlogPost = require("../../models/featured/Blog");

// @route GET api/announcements
// @desc Fetch announcements and blog posts
// @access Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const news = await News.find().sort({ time: -1 }).limit(5).exec();
    const blogs = await BlogPost.find().sort({ time: -1 }).limit(20).exec();

    res.json({
      status: "success",
      data: {
        announcements: news,
        blogPosts: blogs,
      },
    });
  })
);

module.exports = router;
