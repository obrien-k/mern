const express = require("express");
const cors = require("cors");
const router = express.Router();
const User = require("../../../models/User");
const UserRank = require("../../../models/UserRank");
const auth = require("../../../middleware/auth");
const checkPermissions = require("../../../middleware/permissions");

// the auth/routing for this structure is bad, update this soon -- ok ok

// Toolbox endpoint
router.get("/", [auth("admin_manage_news")], async (req, res) => {
  const modBar = [];
  const { permissions } = req.user;
  console.log("req.user", req.user);
  console.log("permissions", permissions);

  // Check if user has permission for Staff PMs
  if (permissions.admin_manage_news === true) {
    const numStaffPMs = 1; // Implement logic to retrieve the number of staff PMs
    if (numStaffPMs > 0) {
      const staffPMLink = `<Link to="staff/messages">${numStaffPMs} Staff PMs</Link>`;
      modBar.push(staffPMLink);
    }
  }

  // Check if user has permission for Reports
  if (permissions.admin_reports === true) {
    const numCommunityReports = 1; // Implement logic to retrieve the number of community reports
    if (numCommunityReports > 0) {
      const communityReportsLink = `<Link to="reportsv2.js">${numCommunityReports} ${
        numCommunityReports === 1 ? "Report" : "Reports"
      }</Link>`;
      modBar.push(communityReportsLink);
    }
  }

  // Check if user has permission for Applicants
  if (permissions.applicants_mod === true) {
    // purposefully failing right now, should fail for anyone logged in
    const numNewApplicants = 1; // Implement logic to retrieve the number of new applicants
    if (numNewApplicants > 0) {
      const newApplicantsLink = `<Link to="staff/apply">${numNewApplicants} new Applicant${
        numNewApplicants === 1 ? "" : "s"
      }</Link>`;
      modBar.push(newApplicantsLink);
    }
  }

  // Send the assembled modBar
  res.json({ modBar });
});

// Payments endpoint
router.get("/payments", auth("admin_permission_key"), (req, res) => {
  // Change 'admin_permission_key' to the correct permission key
  // Implement the payments due functionality
  // ...
  res.send("Payments due for Admins");
});

// DB key endpoint
router.get("/db_key", auth("admin_permission_key"), (req, res) => {
  // Change 'admin_permission_key' to the correct permission key
  // Implement the DB key status functionality
  // ...
  res.send("DB key status for Admins");
});

// Periodic tasks endpoint
router.get("/periodic_tasks", auth("admin_permission_key"), (req, res) => {
  // Change 'admin_permission_key' to the correct permission key
  // Implement the periodic tasks functionality
  // ...
  res.send("Periodic tasks for Admins");
});

module.exports = router;
