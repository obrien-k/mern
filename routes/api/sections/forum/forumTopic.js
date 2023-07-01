const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../../middleware/auth');
const ForumTopic = require('../../../../models/forum/ForumTopic');
const ForumPost = require('../../../../models/forum/ForumPost');
const Forum = require('../../../../models/forum/Forum');
const ForumPoll = require('../../../../models/forum/ForumPoll');

// @route   GET api/forums/topics
// @desc    Get all forum topics
// @access  Private
router.get('/', async (req, res) => {
  try {
    const forumTopics = await ForumTopic.find().populate('ForumID', 'Name');
    res.json(forumTopics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/forums/topics
// @desc    Create a new forum topic
// @access  Private
router.post(
  '/',
  [
      auth(),
      [
          check('Title', 'Title is required').not().isEmpty(),
          check('ForumID', 'ForumID is required').not().isEmpty(),
          check('Body', 'Body is required').not().isEmpty()
      ]
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      
      try {
          const { Title, ForumID, Body, Question, Answers } = req.body;

          // Check if the specified ForumID exists
          const forum = await Forum.findById(ForumID);
          if (!forum) {
              return res.status(404).json({ msg: 'Forum not found' });
          }

          // Check for Poll
          let pollId = null;
          if (Question && Answers) {
              const newPoll = new ForumPoll({
                  TopicID: null, // will be set after topic is created
                  Question,
                  Answers: JSON.stringify(Answers), // store answers as JSON string
                  Featured: null,
                  Closed: false
              });
              const poll = await newPoll.save();
              pollId = poll._id;
          }

          // Creating new ForumTopic
          const newTopic = new ForumTopic({
              Title,
              AuthorID: req.user.id,
              ForumID: forum._id,
              NumPosts: 1, // the first post
              IsLocked: false,
              IsSticky: false,
              LastPostTime: Date.now()
          });

          // Save the new topic
          const topic = await newTopic.save();

          // If there's a poll, update its TopicID
          if (pollId) {
              const poll = await ForumPoll.findById(pollId);
              poll.TopicID = topic._id;
              await poll.save();
          }

          // Creating the original post with the associated TopicID
          const newPost = new ForumPost({
              TopicID: topic._id,
              AuthorID: req.user.id,
              Body,
              EditedUserID: [],
              EditedTime: []
          });

          // Save the original post
          const originalPost = await newPost.save();

          // Update the LastPostID of the topic
          topic.LastPostID = originalPost._id;
          topic.LastPostAuthorID = req.user.id;
          topic.ForumPosts.push(originalPost._id);
          await topic.save();

          // Update counters and last post data for forum
          forum.ForumTopics.push(topic._id);
          forum.LastPostID = originalPost._id;
          forum.LastPostAuthorID = req.user.id;
          forum.LastPostTopicID = topic._id;
          forum.LastPostTime = Date.now();
          await forum.save();

          res.json(topic);

      } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
  }
);

// @route   PUT api/forums/topics/:id
// @desc    Update a forum topic
// @access  Private
router.put('/:id', [auth, [
  check('Title', 'Title is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { Title } = req.body;
    const topic = await ForumTopic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ msg: 'Topic not found' });
    }

    // Check user
    if (topic.AuthorID.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    topic.Title = Title;
    await topic.save();

    res.json(topic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/forums/topics/:id
// @desc    Delete a forum topic
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const topic = await ForumTopic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ msg: 'Topic not found' });
    }

    // Check user
    if (topic.AuthorID.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await topic.remove();
    res.json({ msg: 'Topic removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;