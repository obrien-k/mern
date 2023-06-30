const express = require('express');
const router = express.Router();
const auth = require('../../auth');
const checkPerms = require('../../../../middleware/permissions');
const ForumCategory = require('../../../../models/forum/ForumCategory');

// @route   GET api/forums/categories
// @desc    Get all forum categories
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const categories = await ForumCategory.find().sort({ Sort: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
