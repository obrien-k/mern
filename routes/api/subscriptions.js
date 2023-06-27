const express = require('express');
const { Subscription, CommentSubscription, Notification } = require('../../models/Subscriptions');
const router = express.Router();

// Subscribe or unsubscribe from a forum thread
router.post('/subscribe', async (req, res) => {
  const { userId, topicId, action } = req.body;

  try {
      if (action === 'subscribe') {
          const newSubscription = new Subscription({ userId, topicId });
          await newSubscription.save();
          res.status(201).json({ message: 'Subscribed successfully' });
      } else if (action === 'unsubscribe') {
          await Subscription.deleteOne({ userId, topicId });
          res.json({ message: 'Unsubscribed successfully' });
      } else {
          res.status(400).json({ message: 'Invalid action' });
      }
  } catch (error) {
      console.error('Error handling subscription:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Get the list of subscriptions for a particular user
router.get('/get-subscriptions', async (req, res) => {
  const { userId } = req.query;

  try {
      const subscriptions = await Subscription.find({ userId }).populate('topicId');
      res.json(subscriptions);
  } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Subscribe or unsubscribe from comments on a particular page
router.post('/subscribe-comments', async (req, res) => {
  const { userId, page, pageId, action } = req.body;

  try {
      if (action === 'subscribe') {
          const newCommentSubscription = new CommentSubscription({ userId, page, pageId });
          await newCommentSubscription.save();
          res.status(201).json({ message: 'Subscribed to comments successfully' });
      } else if (action === 'unsubscribe') {
          await CommentSubscription.deleteOne({ userId, page, pageId });
          res.json({ message: 'Unsubscribed from comments successfully' });
      } else {
          res.status(400).json({ message: 'Invalid action' });
      }
  } catch (error) {
      console.error('Error handling comment subscription:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

/*
router.post('/quote-notify', async (req, res) => {
    // Logic to handle quote notifications
    // This will include the logic for parsing the post/comment body
    // and creating notifications in the database using the Notification model
});

router.post('/subscribe', async (req, res) => {
    // Logic to subscribe or unsubscribe from a forum thread
});

router.post('/subscribe-comments', async (req, res) => {
    // Logic to subscribe or unsubscribe from comments
});

router.get('/get-subscriptions', async (req, res) => {
    // Logic to get subscriptions
});

router.get('/get-comment-subscriptions', async (req, res) => {
    // Logic to get comment subscriptions
});

router.get('/has-new-subscriptions', async (req, res) => {
    // Logic to check if the current user has new subscriptions
});*/

module.exports = router;