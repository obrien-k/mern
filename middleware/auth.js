const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const cookieParser = require("cookie-parser"); // Import this package

module.exports = function (requiredPermission) {
  return async (req, res, next) => {
    console.log("Value of requiredPermission:", requiredPermission); // Log the value

    // Use cookie-parser package to parse the cookies
    const cookies = cookieParser()(req, res, () => {});
    // Get the token from cookies
    const token = cookies.token;

    // Check if no token
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded.user;

      // Check if requiredPermission is not defined
      if (!requiredPermission) {
        console.log("No permission required"); // Log here to check if we enter this block
        next(); // No permissions required, proceed to next middleware
      } else {
        const userId = req.user.id;
        // Find the user in the database and populate the userRank field
        const user = await User.findById(userId).populate("userRank");
        // Check if user is found and if user's rank has the required permissions
        if (user && user.userRank && user.userRank.field3[requiredPermission]) {
          next(); // Proceed to the endpoint
        } else {
          res.status(403).send("Permission Denied");
        }
      }
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };
};
