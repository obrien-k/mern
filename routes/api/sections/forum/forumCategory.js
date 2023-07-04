const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../auth'); // wrong auth, should be middleware
const { asyncHandler } = require('../../../../middleware/asyncHandler');
const ForumCategory = require('../../../../models/forum/ForumCategory');

// @route   GET api/forums/categories
// @desc    Get all forum categories
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const categories = await ForumCategory.find().sort({ Sort: 1 });
    res.json(categories);
}));

// @route   GET api/forums/categories/:id
// @desc    Get forum category by ID
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const category = await ForumCategory.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ msg: 'Category not found' });
  }

  res.json(category);
}));

// @route   POST api/forums/categories
// @desc    Create a new forum category
// @access  Private
router.post('/', [auth, [
  check('name', 'name is required').not().isEmpty()
]], asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 
  const { name } = req.body;

  // Creating new ForumCategory
  const newCategory = new ForumCategory({
    name
  });

  // Save the new category
  const category = await newCategory.save();

  res.json(category);
}));

// @route   PUT api/forums/categories/:id
// @desc    Update a forum category
// @access  Private
router.put('/:id', [auth, [
  check('name', 'name is required').not().isEmpty()
]], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const category = await ForumCategory.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ msg: 'Category not found' });
  }

  category.name = name;
  await category.save();

  res.json(category);
}));

// @route   DELETE api/forums/categories/:id
// @desc    Delete a forum category
// @access  Private
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  const category = await ForumCategory.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ msg: 'Category not found' });
  }

  await category.remove();
  res.json({ msg: 'Category removed' });
}));

module.exports = router;