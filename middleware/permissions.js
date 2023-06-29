function checkPerms(requiredPermission) {
  return async (req, res, next) => {
    try {
      // Assuming that the user's ID is passed in the request header as 'userId'
      const userId = req.headers.userId;
      
      // Find the user in the database and populate the userRank field
      const user = await User.findById(userId).populate('userRank');
      
      // Check if user is found and if user's rank has the required permissions
      if (user && user.userRank && user.userRank.field3[requiredPermission]) {
        next(); // proceed to the endpoint
      } else {
        res.status(403).send('Permission Denied');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
}
module.exports = checkPerms;