const User = require('../../../models/User'); 
const Invite = require('../../../models/profile/invite'); 

const expireInvites = async () => {
  try {
    const expiredInvites = await Invite.find({
      expires: { $lt: new Date() }
    });

    for (const invite of expiredInvites) {
      const user = await User.findById(invite.InviterID);
      if (user) {
        user.totalInvites += 1;
        await user.save();
      }

      await Invite.findByIdAndDelete(invite._id);
    }

    console.log(`Expired ${expiredInvites.length} invites.`);
  } catch (error) {
    console.error('Error expiring invites:', error);
  }
};

module.exports = expireInvites;
