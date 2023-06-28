const User = require('../../../models/User'); 

const grantInvites = async () => {
  try {
    const users = await User.find({
      userRole: { $ne: 'User' }
    });

    for (const user of users) {
      user.totalInvites += 1;
      await user.save();
    }

    console.log(`Granted invites to ${users.length} users.`);
  } catch (error) {
    console.error('Error granting invites:', error);
  }
};

module.exports = grantInvites;
