const express = require('express');
const cors = require('cors');
const router = express.Router();
const UserRank = require('../../../models/UserRank');

router.use(cors()); // Use the CORS middleware

const modBar = [];

// Middleware to check permissions
function checkPerms(requiredRank) {
  return async (req, res, next) => {
    try {
      const user = await UserRank.findOne({ userId: req.userId });
      if (user && user.rank >= requiredRank) {
        next();
      } else {
        res.status(403).send('Permission Denied');
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  };
}


// Toolbox endpoint
router.get('/', async (req, res) => {
  
  const userId = req.userId; // Get userId from request
  const modBar = [];

  // Check if user has permission for Staff PMs
  if (await checkPerms(UserRank.FORUM_MOD, userId)) {
    const numStaffPMs = 1; // Implement logic to retrieve the number of staff PMs
    if (numStaffPMs > 0) {
      const staffPMLink = `<a href="staffpm.js">${numStaffPMs} Staff PMs</a>`;
      modBar.push(staffPMLink);
    }
  }

  // Check if user has permission for Reports
  if (await checkPerms(UserRank.REPORTS_MOD, userId)) {
    const numCommunityReports = 1; // Implement logic to retrieve the number of community reports
    if (numCommunityReports > 0) {
      const communityReportsLink = `<a href="reportsv2.js">${numCommunityReports} ${numCommunityReports === 1 ? 'Report' : 'Reports'}</a>`;
      modBar.push(communityReportsLink);
    }
  }

  // Check if user has permission for Applicants
  if (await checkPerms(UserRank.APPLICANTS_MOD, userId)) {
    const numNewApplicants = 1; // Implement logic to retrieve the number of new applicants
    if (numNewApplicants > 0) {
      const newApplicantsLink = `<a href="apply.js?action=view">${numNewApplicants} new Applicant${numNewApplicants === 1 ? '' : 's'}</a>`;
      modBar.push(newApplicantsLink);
    }
  }

  // Check if user has permission for Enable requests
  if (await checkPerms(UserRank.ENABLE_MOD, userId)) {
    const numEnableRequests = 1; // Implement logic to retrieve the number of enable requests
    if (numEnableRequests > 0) {
      const enableRequestsLink = `<a href="tools.php?action=enable_requests">${numEnableRequests} Enable requests</a>`;
      modBar.push(enableRequestsLink);
    }
  }

  // Send the assembled modBar
  res.json({ modBar });
});

// Payments endpoint
router.get('/payments', checkPerms(UserRank.ADMIN), (req, res) => {
  // Implement the payments due functionality
  // ...
  res.send('Payments due for Admins');
});

// DB key endpoint
router.get('/db_key', checkPerms(UserRank.ADMIN), (req, res) => {
  // Implement the DB key status functionality
  // ...
  res.send('DB key status for Admins');
});

// Periodic tasks endpoint
router.get('/periodic_tasks', checkPerms(UserRank.ADMIN), (req, res) => {
  // Implement the periodic tasks functionality
  // ...
  res.send('Periodic tasks for Admins');
});

module.exports = router;
