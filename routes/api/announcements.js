const express = require('express');
const router = express.Router();

const News = require('../../models/News');
const BlogPost = require('../../models/Blog');

// @route GET api/announcements
// @desc Fetch announcements and blog posts
// @access Public
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ time: -1 }).limit(5).exec();
        const blogs = await BlogPost.find().sort({ time: -1 }).limit(20).exec();

        res.json({
            status: "success",
            data: {
                announcements: news,
                blogPosts: blogs
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
});

module.exports = router;
