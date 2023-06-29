const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/permissions/:rank', async (req, res) => {
  try {
    const permissions = {
      ADMIN: '40',
      USER: '2',
      MEMBER: '3',
      POWER: '4',
      ELITE: '5',
      VIP: '26',
      TORRENT_MASTER: '25',
      LEGEND: '27',
      CELEB: '31',
      MOD: '11',
      CODER: '24',
      LEAD_DEV: '43',
      SYSOP: '15',
      ARTIST: '19',
      DONOR: '20',
      FLS_TEAM: '23',
      POWER_TM: '29',
      ELITE_TM: '28',
      FORUM_MOD: '21',
      TORRENT_MOD: '22',
      INTERVIEWER: '30',
      DESIGNER: '32',
      SECURITY: '33',
      IRC: '34',
      SHADOW: '35',
      ALPHA: '36',
      BRAVO: '37',
      CHARLIE: '38',
      DELTA: '39',
      RECRUITER: '41',
      ULTIMATE_TM: '48'
    };

    const { rank } = req.params;
    const permissionId = permissions[rank];

    if (!permissionId) {
      return res.status(400).json({ error: 'Invalid rank.' });
    }

    const user = await User.findOne({ userRole: permissionId });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ permissions: user.permissions });
  } catch (error) {
    console.error('Error retrieving user permissions:', error);
    res.status(500).json({ error: 'An error occurred while retrieving user permissions.' });
  }
});

module.exports = router;
