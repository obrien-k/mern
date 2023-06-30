const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const checkPerms = require('../../../../middleware/permissions');
const ForumTopicNote = require('../../../../models/forum/ForumTopicNote');


// @route   GET api/forums/topics/notes
// @desc    Get all notes for a forum topic
// @access  Private
router.get('/', auth(), async (req, res) => {
  try {
    const topicNotes = await ForumTopicNote.find({}).sort({ createdAt: -1 });
    res.json(topicNotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/forums/topics/notes
// @desc    Add a note to a forum topic
// @access  Private
router.post('/', auth(), async (req, res) => {
  try {
    const { Body } = req.body;

    // Creating new ForumTopicNote
    const newTopicNote = new ForumTopicNote({
      AuthorID: req.user.id,
      Body
    });

    const topicNote = await newTopicNote.save();
    res.json(topicNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/forums/topics/notes/:noteId
// @desc    Delete a note from a forum topic
// @access  Private
router.delete('/:noteId', auth(), checkPerms, async (req, res) => {
  try {
    const note = await ForumTopicNote.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    await note.remove();
    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
