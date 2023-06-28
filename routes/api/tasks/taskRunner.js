const express = require('express');
const router = express.Router();
const grantInvites = require('./grantInvites');
const expireInvites = require('./expireInvites');

router.get('/test/grant-invites', async (req, res) => {
  await grantInvites();
  res.send('Invites granted');
});

router.get('/test/expire-invites', async (req, res) => {
  await expireInvites();
  res.send('Invites expired');
});

module.exports = router;