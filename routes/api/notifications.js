const express = require('express');
const router = express.Router();

router.get('/api/notification-settings', (req, res) => {
  // Fetch settings from mongodb here.
  // TODO
  res.json({
    settings: {},
    pushOptions: {}
  });
});