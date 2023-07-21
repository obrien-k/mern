const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = function (requiredPermission) {
  return async (req, res, next) => {
    console.log("Value of requiredPermission:", requiredPermission);

    // Get the token from cookies
    const token = req.cookies.token;

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
        console.log("No permission required");
        next();
      } else {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("userRank");
        console.log(user);
        if (user && user.userRank && user.userRank.field3[requiredPermission]) {
          req.user.permissions = user.userRank.field3;
          console.log(req.user.permissions) +
            console.log("permissions on user ");
          next();
        } else {
          res.status(403).send("Permission Denied");
        }
      }
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };
};
