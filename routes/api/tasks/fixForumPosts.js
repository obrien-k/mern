const express = require('express');
const router = express.Router();
const ForumTopic = require('../../../models/forum/ForumTopic');
const ForumPost = require('../../../models/forum/ForumPost');
const Forum = require('../../../models/forum/Forum');

// ...

// @route   POST api/forums/topics/fix-posts
// @desc    Fix missing original posts for existing forum topics
// @access  Private
router.get('/', async (req, res) => {
  try {
    // Find all forum topics without an original post
    const topicsWithoutPost = await ForumTopic.find({ LastPostID: null });

    for (const topic of topicsWithoutPost) {
      // Create a new original post
      const newPost = new ForumPost({
        AuthorID: topic.AuthorID,
        ForumID: topic.ForumID,
        Body: 'Default body for the original post'
      });

      // Save the original post
      const originalPost = await newPost.save();

      // Update the topic with the new original post ID
      topic.LastPostID = originalPost._id;
      topic.LastPostAuthorID = originalPost.AuthorID;
      await topic.save();
    }

    res.json({ message: 'Missing original posts have been fixed successfully.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
