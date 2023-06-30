const express = require('express');
const router = express.Router();
const grantInvites = require('./grantInvites');
const expireInvites = require('./expireInvites');
const generateTestData = require('./generateRanks');

router.get('/grant-invites', async (req, res) => {
  await grantInvites();
  res.send('Invites granted');
});

router.get('/expire-invites', async (req, res) => {
  await expireInvites();
  res.send('Invites expired');
});

router.get('/generate', async (req, res) => {
  await generateTestData();
  res.send('Generation complete');
});


module.exports = router;