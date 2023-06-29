const express = require('express');
const router = express.Router();
const checkPerms = require('../../../../middleware/permissions');
const ForumCategory = require('../../../../models/forum/ForumsCategory');

// @route   GET api/forumCategories
// @desc    Get all forum categories
// @access  Public
router.get('/', checkPerms('read_forum_category'), async (req, res) => {
  try {
    const categories = await ForumCategory.find().sort({ Sort: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
