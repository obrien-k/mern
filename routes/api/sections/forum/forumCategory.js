const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../auth');
const ForumCategory = require('../../../../models/forum/ForumCategory');

// @route   GET api/forums/categories
// @desc    Get all forum categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await ForumCategory.find().sort({ Sort: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/forums/categories/:id
// @desc    Get forum category by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await ForumCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/forums/categories
// @desc    Create a new forum category
// @access  Private
router.post('/', [auth, [
  check('Name', 'Name is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { Name } = req.body;

    // Creating new ForumCategory
    const newCategory = new ForumCategory({
      Name
    });

    // Save the new category
    const category = await newCategory.save();

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/forums/categories/:id
// @desc    Update a forum category
// @access  Private
router.put('/:id', [auth, [
  check('Name', 'Name is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { Name } = req.body;
    const category = await ForumCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    category.Name = Name;
    await category.save();

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/forums/categories/:id
// @desc    Delete a forum category
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await ForumCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    await category.remove();
    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;