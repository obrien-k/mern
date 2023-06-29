const express = require('express');
const cors = require('cors');
const router = express.Router();
const User = require('../../../models/User');
const UserRank = require('../../../models/UserRank');

router.use(cors()); // Use the CORS middleware

// Utility function to check permissions
async function hasPermission(userId, requiredPermission) {
  try {
    // Find the user in the database and populate the userRank field
    const user = await User.findById(userId).populate('userRank');
    
    // Check if user is found and if user's rank has the required permissions
    return !!(user && user.userRank && user.userRank.field3[requiredPermission]);
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Middleware to check permissions
function checkPerms(requiredPermission) {
  return async (req, res, next) => {
    const userId = req.headers.userId; // Assuming the userId is passed as a header
    if (await hasPermission(userId, requiredPermission)) {
      next();
    } else {
      res.status(403).send('Permission Denied');
    }
  };
}

// Toolbox endpoint
router.get('/', async (req, res) => {
  const userId = req.headers.userId; // Get userId from request header
  const modBar = [];

  // Check if user has permission for Staff PMs
  if (await hasPermission(userId, 'forums_polls_create')) {
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
router.get('/payments', checkPerms('admin_permission_key'), (req, res) => { // Change 'admin_permission_key' to the correct permission key
  // Implement the payments due functionality
  // ...
  res.send('Payments due for Admins');
});

// DB key endpoint
router.get('/db_key', checkPerms('admin_permission_key'), (req, res) => { // Change 'admin_permission_key' to the correct permission key
  // Implement the DB key status functionality
  // ...
  res.send('DB key status for Admins');
});

// Periodic tasks endpoint
router.get('/periodic_tasks', checkPerms('admin_permission_key'), (req, res) => { // Change 'admin_permission_key' to the correct permission key
  // Implement the periodic tasks functionality
  // ...
  res.send('Periodic tasks for Admins');
});

module.exports = router;
