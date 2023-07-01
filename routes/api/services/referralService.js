const axios = require('axios');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../../../models/User');
const Invite = require('../../../models/profile/invite');
const convertToObjectId = require('../util/objectId');

require('dotenv').config()

class ReferralService {
  constructor() {
    this.cache = {
      stats_user_count: null,
    };
    this.disabledChan = 'BOT_DISABLED_CHAN';
    this.ircServer = 'BOT_SERVER';
  }

  async getUserCount() {
    if (this.cache.stats_user_count === null) {
      const response = await axios.get('your/stats/user/count/endpoint'); // Replace with your actual API endpoint for user count
      this.cache.stats_user_count = response.data.count;
    }
    return this.cache.stats_user_count;
  }

  async canInviteUser(userID) {

 return true;
    /* force pass 
    const user = await User.findById(userID);
    if (!user) {
      throw new Error('User ' + userID + ' not found');
    }
    if (
      user.RatioWatch ||
      !user.can_leech ||
      user.DisableInvites === '1' ||
      user.Invites === 0 ||
      (user.Invites === 0 && !user.check_perms('site_send_unlimited_invites')) ||
      (await this.getUserCount()) >= USER_LIMIT ||
      (USER_LIMIT !== 0 && !user.check_perms('site_can_invite_always'))
    ) {
      throw new Error('Invalid invitation');
    }
    */
  }

  async createInvite(service, email, userId, userName, reason) {
    console.log(userId);
    console.log(reason);
    const userObjectId = convertToObjectId(userId);

    const user = await User.findById(userObjectId);
    if (!user) {
      throw new Error('User not found');
    }
    if (typeof email !== 'string') {
      throw new Error('Invalid email parameter.');
    }
    try {
      await this.canInviteUser(user);
    } catch (error) {
      throw new Error('Failed to verify user invitation privileges.');
    }
    // MultiInvite
    const emails = email.includes('|') ? email.split('|') : [email];

    for (const curEmail of emails) {
    /*  if (!curEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)) {
        if (emails.length > 1) {
          continue;
        } else {
          throw new Error('Invalid email.');
        }
      }*/

      

      // Associate the invite with the user
      try {
        const existingInvite = await Invite.findOne({
          InviterID: user._id,
          Email: { $regex: `^${curEmail}$`, $options: 'i' },
        });
  
        if (existingInvite) {
          throw new Error('You already have a pending invite to that address!');
        }
        } catch (error) {
            console.error("Original error message:", error.message);
            console.error("Original error stack:", error.stack);
            
            throw new Error(error.message || 'Error querying for existing invites.');
        }

      const inviteKey = crypto.randomBytes(16).toString('hex');
      const inviteExpires = Date.now() + 3 * 24 * 60 * 60 * 1000; // 3 days

      let invite;
      try {
        // Save invite to the database
        invite = await Invite.create({
          InviterID: user._id,
          InviteKey: inviteKey,
          Email: curEmail,
          Expires: inviteExpires,
          Reason: reason
        });
      } catch (error) {
        console.error("Original error message:", error.message);
        throw new Error('Failed to create invite in database.');
      }
      
      const siteName = 'Stellar'; // Replace with config
      const siteURL = 'https://stellargra.ph'; // Replace with config

      const message = `
        The user ${userName} has invited you to join ${siteName} and has specified this address (${curEmail}) as your email address. If you do not know this person, please ignore this email, and do not reply.

        Please note that selling invites, trading invites, and giving invites away publicly (e.g., on a forum) is strictly forbidden. If you have received your invite as a result of any of these things, do not bother signing up - you will be banned and lose your chances of ever signing up legitimately.

        If you have previously had an account at ${siteName}, do not use this invite. Instead, please join ${this.disabledChan} on ${this.ircServer} and ask for your account to be reactivated.

        To confirm your invite, click on the following link:

        ${siteURL}register.php?invite=${inviteKey}

        After you register, you will be able to use your account. Please take note that if you do not use this invite in the next 3 days, it will expire. We urge you to read the RULES and the wiki immediately after you join.

        Thank you,
        ${siteName} Staff
      `;

      // Sending email
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 25,
        secure: false, // use SSL
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: curEmail,
        subject: `You have been invited to ${siteName}`,
        text: message,
      };
      
      try {
        await transporter.sendMail(mailOptions);
        console.log('Invitation email sent successfully.');
      } catch (error) {
        console.error('Error sending invitation email:', error);
        throw new Error('Failed to send the invitation email.');
      }
      
    }
  }
}

module.exports = ReferralService;
