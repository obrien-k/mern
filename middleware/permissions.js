function checkPermissions(requiredPermission) {
  return async (req, res, next) => {
    try {
      console.log("Inside checkPerms");

      if (!req.user || !req.user.id) {
        console.log("User not found in request");
        return res.status(401).send("Unauthorized");
      }

      const userId = req.user.id;

      console.log(
        `Checking permission ${requiredPermission} for user ${userId}`
      );

      // Check if requiredPermission is not defined
      if (!requiredPermission) {
        console.log("No permission required");
        return next();
      }

      // Find the user in the database and populate the userRank field
      const user = await User.findById(userId).populate("userRank");

      // Logging user and userRank for debugging
      console.log("User:", user);
      console.log("User Rank:", user.userRank);

      // Check if user is found and if user's rank has the required permissions
      if (user && user.userRank && user.userRank.field3[requiredPermission]) {
        console.log("Permission granted");
        next(); // Proceed to the endpoint
      } else {
        console.log("Permission denied");
        res.status(403).send("Permission Denied");
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };
}

module.exports = checkPermissions;
