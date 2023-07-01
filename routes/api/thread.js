const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Thread = require('../../models/Thread');
const Note = require('../../models/Note');
const User = require('../../models/User');

// @route   POST /threads
// @desc    Create a new thread
// @access  Private
router.post(
  '/',
  [
    auth(),
    [
      check('type', 'Type is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newThread = new Thread({
        type: req.body.type
      });

      const thread = await newThread.save();
      res.json(thread);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /threads/:id
// @desc    Get a thread by its ID
// @access  Private
router.get('/:id', auth(), async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) {
      return res.status(404).json({ msg: 'Thread not found' });
    }
    res.json(thread);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Thread not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST /threads/:id/notes
// @desc    Save a note to a specific thread
// @access  Private
router.post(
  '/:id/notes',
  [
    auth(),
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('visibility', 'Visibility is required and must be public or staff')
        .isIn(['public', 'staff'])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newNote = new Note({
        thread: req.params.id,
        user: req.user.id,
        text: req.body.text,
        visibility: req.body.visibility
      });

      const note = await newNote.save();
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /threads/:id/notes/:noteId
// @desc    Update a note in a thread
// @access  Private
router.put(
  '/:id/notes/:noteId',
  [
    auth(),
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('visibility', 'Visibility is required and must be public or staff')
        .isIn(['public', 'staff'])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = await Note.findById(req.params.noteId);
      if (!note) {
        return res.status(404).json({ msg: 'Note not found' });
      }

      // Check if the note belongs to the thread
      if (note.thread.toString() !== req.params.id) {
        return res.status(400).json({ msg: 'Note does not belong to this thread' });
      }

      note.text = req.body.text;
      note.visibility = req.body.visibility;
      await note.save();

      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /threads/:id/edit
// @desc    Edit a thread
// @access  Private (Moderators or auto-transitioning)
router.put(
  '/:id/edit',
  [
    auth(),
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('forumId', 'Forum ID is required')
        .not()
        .isEmpty(),
      check('ranking', 'Ranking must be a non-negative number')
        .isInt({ min: 0 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, forumId, ranking, locked, sticky } = req.body;

      // Check if the user has moderation permissions or is auto transitioning
      // Assuming checkPerms is a function that checks permissions
      if (!checkPerms(req.user, 'site_moderate_forums') && !req.body.transition) {
        return res.status(403).json({ msg: 'Not Authorized' });
      }

      // Find the thread
      const thread = await Thread.findById(req.params.id);

      if (!thread) {
        return res.status(404).json({ msg: 'Thread not found' });
      }

      // Check the write permissions for the forum
      // Assuming Forum is a correct model or method to retrieve the forum details
      const forum = await Forum.findById(forumId);
      if (forum && forum.minClassWrite > req.user.class) {
        return res.status(403).json({ msg: 'Not Authorized' });
      }

      // Edit the thread
      thread.title = title;
      thread.forum = forumId;
      thread.ranking = ranking;

      if (typeof locked !== 'undefined') {
        thread.Locked = locked; // Updated field name
      }

      if (typeof sticky !== 'undefined') {
        thread.Sticky = sticky; // Updated field name
      }

      // Save the edited thread
      await thread.save();

      res.json(thread);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Thread not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /threads/:id/notes/:noteId
// @desc    Delete a note from a thread
// @access  Private
router.delete('/:id/notes/:noteId', auth(), async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Check if the note belongs to the thread
    if (note.thread.toString() !== req.params.id) {
      return res.status(400).json({ msg: 'Note does not belong to this thread' });
    }

    await note.remove();
    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
