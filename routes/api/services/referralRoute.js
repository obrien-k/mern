const express = require('express');
const router = express.Router();
const ReferralService = require('./referralService');
const User = require('../../../models/User');
require('dotenv').config('../../.env');

// Create an instance of ReferralService
const referralService = new ReferralService();

router.get('/services-list', async (req, res) => {
  try {
    const services = await referralService.servicesList();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/generate-token', async (req, res) => {
  try {
    const token = await referralService.generateToken();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/verify-token', async (req, res) => {
  const { service, userId } = req.query;
  try {
    const isVerified = await referralService.verifyToken(service, userId);
    res.json({ isVerified });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/verify-invite-key', async (req, res) => {
  const { inviteKey } = req.query;
  try {
    const user = await User.findOne({ 'invitesSent.inviteKey': inviteKey });
    if (!user) {
      return res.status(404).json({ error: 'Invite key not found' });
    }
    const invite = user.invitesSent.find((inv) => inv.inviteKey === inviteKey);
    if (invite.redeemed || new Date() > invite.expires) {
      return res.status(400).json({ error: 'Invite key is no longer valid' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-invite', async (req, res) => {
  const { email, username, reason } = req.body;
  try {
    await referralService.createInvite(email, username, reason);
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ Message: 'An internal server error occurred while creating the invite.', error });
  }
});

module.exports = router;
