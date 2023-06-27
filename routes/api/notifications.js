const express = require('express');
const router = express.Router();

// Mock data
const userSettings = {
    userId: 1,
    pushService: 2,
    pushOptions: {
        pushDevice: '',
        pushKey: 'example_push_key',
    },
    notificationSettings: {
        news: true,
        blog: true,
        inbox: true,
        staffMessages: true,
        threadSubscriptions: true,
        quoteNotifications: true,
    },
};

// API endpoint to get notification settings
router.get('/api/notification-settings/:userId', (req, res) => {
    const requestedUserId = parseInt(req.params.userId, 10);
    
    // Currently mock data
    if (requestedUserId === userSettings.userId) {
        res.json(userSettings);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
