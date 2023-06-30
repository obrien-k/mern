const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Stylesheet = require('../../models/profile/Stylesheet');

// @route   POST api/stylesheet
// @desc    Create a new stylesheet
// @access  Private
router.post(
  '/',
  [
    auth(),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('content', 'Content is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, content } = req.body;

      const newStylesheet = new Stylesheet({
        name,
        content
      });

      const stylesheet = await newStylesheet.save();

      res.json(stylesheet);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/stylesheet
// @desc    Get all stylesheets
// @access  Private
router.get('/', auth(), async (req, res) => {
  try {
    const stylesheets = await Stylesheet.find().sort({ created_at: -1 });
    res.json(stylesheets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/stylesheet/:id
// @desc    Get stylesheet by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const stylesheet = await Stylesheet.findById(req.params.id);
    if (!stylesheet) {
      return res.status(404).json({ msg: 'Stylesheet not found' });
    }

    res.json(stylesheet);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Stylesheet not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/stylesheet/:id
// @desc    Delete a stylesheet
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const stylesheet = await Stylesheet.findById(req.params.id);
    if (!stylesheet) {
      return res.status(404).json({ msg: 'Stylesheet not found' });
    }

    await stylesheet.remove();
    res.json({ msg: 'Stylesheet removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Stylesheet not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
