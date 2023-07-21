//middleware/permissions.js
module.exports = function (requiredPermission) {
  return function (req, res, next) {
    if (!requiredPermission) {
      return next();
    }

    if (req.user.permissions.includes(requiredPermission)) {
      next();
    } else {
      res.status(403).json({ msg: "Permission denied" });
    }
  };
};
