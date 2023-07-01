const express = require('express');
const router = express.Router();
const grantInvites = require('./grantInvites');
const expireInvites = require('./expireInvites');
const generateTestData = require('./generateTestData');
const fixMissingTopicID = require('./fixMissingTopicId');

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

router.get('/fix-topics', async (req, res) => {
  await fixMissingTopicID();
  res.send('Generation complete');
});



module.exports = router;