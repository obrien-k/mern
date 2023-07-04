const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const { asyncHandler } = require('../../../../middleware/asyncHandler');
const ForumTopicNote = require('../../../../models/forum/ForumTopicNote');


// @route   GET api/forums/topics/notes
// @desc    Get all notes for a forum topic
// @access  Private
router.get('/', auth(), asyncHandler(async (req, res) => {
    const topicNotes = await ForumTopicNote.find({}).sort({ createdAt: -1 });
    res.json(topicNotes);
}));

// @route   POST api/forums/topics/notes
// @desc    Add a note to a forum topic
// @access  Private
router.post('/', auth(), asyncHandler(async (req, res) => {
    const { Body } = req.body;

    // Creating new ForumTopicNote
    const newTopicNote = new ForumTopicNote({
      AuthorID: req.user.id,
      Body
    });

    const topicNote = await newTopicNote.save();
    res.json(topicNote);
}));

// @route   DELETE api/forums/topics/notes/:noteId
// @desc    Delete a note from a forum topic
// @access  Private
router.delete('/:noteId', auth(), asyncHandler(async (req, res) => {
    const note = await ForumTopicNote.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    await note.remove();
    res.json({ msg: 'Note removed' });
}));

module.exports = router;
