const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

const UserRank = require('../../../models/UserRank');

// @route   POST api/tools/permissions
// @desc    Create a UserRank
// @access  Private
router.post(
  '/',
  [
    auth(), // Add any necessary middleware for authentication
    [
      // Add validation checks for the required fields
      check('field1', 'Field 1 is required').not().isEmpty(),
      check('field2', 'Field 2 is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUserRank = new UserRank({
        field1: req.body.field1,
        field2: req.body.field2,
        field3: req.body.field3,
        field4: req.body.field4,
        field5: req.body.field5,
        field6: req.body.field6
      });

      const userRank = await newUserRank.save();

      res.json(userRank);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/tools/permissions
// @desc    Get all UserRanks
// @access  Private
router.get('/', auth(), async (req, res) => {
  try {
    const userRanks = await UserRank.find();
    res.json(userRanks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tools/permissions/:id
// @desc    Get UserRank by ID
// @access  Private
router.get('/:id', auth(), async (req, res) => {
  try {
    const userRank = await UserRank.findById(req.params.id);

    if (!userRank) {
      return res.status(404).json({ msg: 'UserRank not found' });
    }

    res.json(userRank);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tools/permissions/:id
// @desc    Update a UserRank
// @access  Private
router.put('/:id', auth(), async (req, res) => {
  try {
    const userRank = await UserRank.findById(req.params.id);

    if (!userRank) {
      return res.status(404).json({ msg: 'UserRank not found' });
    }

    // Update the fields of the userRank object
    userRank.field1 = req.body.field1;
    userRank.field2 = req.body.field2;
    userRank.field3 = req.body.field3;
    userRank.field4 = req.body.field4;
    userRank.field5 = req.body.field5;
    userRank.field6 = req.body.field6;

    await userRank.save();

    res.json(userRank);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/tools/permissions/:id
// @desc    Delete a UserRank
// @access  Private
router.delete('/:id', auth(), async (req, res) => {
  try {
    const userRank = await UserRank.findById(req.params.id);

    if (!userRank) {
      return res.status(404).json({ msg: 'UserRank not found' });
    }

    await userRank.remove();
    res.json({ msg: 'UserRank removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:rank', auth(), async (req, res) => {
  try {
    const permissions = {
      ADMIN: '40',
      USER: '2',
      MEMBER: '3',
      POWER: '4',
      ELITE: '5',
      VIP: '26',
      COMMUNITY_LEAD: '25',
      LEGEND: '27',
      CELEB: '31',
      MOD: '11',
      CODER: '24',
      LEAD_DEV: '43',
      SYSOP: '15',
      ARTIST: '19',
      DONOR: '20',
      FLS_TEAM: '23',
      POWER_CL: '29',
      ELITE_CL: '28',
      FORUM_MOD: '21',
      COMMUNITY_MOD: '22',
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
      ULTIMATE_CL: '48'
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
