const express = require('express');
const router = express.Router();
const session = require('express-session');
const axios = require('axios');
const crypto = require('crypto');
const NodeCache = require('node-cache');
const nodemailer = require('nodemailer');
const User = require('../../../models/User');
require('dotenv').config('../../.env')

class ReferralService {
    constructor() {
        this.externalServices = null;
        this.cookieExpiry = 604800; // 1 week in seconds

        // Load services configuration
        this.loadExternalServices();
    }

    async loadExternalServices() {
        this.externalServices = new NodeCache();

        const whatcdBaseUrl = process.env.WHATCD_BASE_URL;
        const whatcdApiPath = process.env.WHATCD_API_PATH;
        const whatcdCookie = process.env.WHATCD_COOKIE;
      
        // Validate the presence of required environment variables
        if (!whatcdBaseUrl || !whatcdApiPath || !whatcdCookie) {
          throw new Error('Missing configuration for external service WHATCD');
        }
      
        // Create an object with the configuration properties
        const whatcdConfig = {
          baseUrl: whatcdBaseUrl,
          apiPath: whatcdApiPath,
          cookie: whatcdCookie,
        };
      
        // Store the configuration in the externalServices object
        this.externalServices.set('WHATCD', whatcdConfig);
    }

    async serviceIsUp(service) {
        try {
            const response = await axios.head(this.externalServices.get(service).baseUrl);
            return response.status === 200;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async generateToken(req) {
        const token = 'APL:' + crypto.randomBytes(64).toString('hex') + ':APL';
        req.session.referralToken = token;
        return token;
    }

    async verifyToken(service, userId) {
      if (!this.externalServices.get(service)) {
          throw new Error('Invalid referral service');
      }

      const sessionCookie = this.externalServices.get(service).cookie;
      const url = `${this.externalServices.get(service).baseUrl}${this.externalServices.get(service).apiPath}user&id=${userId}`;

      try {
          const response = await axios.get(url, { headers: { 'Cookie': `session=${sessionCookie}` } });

          if (response.data.status === 'failure') {
              throw new Error(`Error: Try again - ${response.data.error}`);
          } else if (response.data.status !== 'success') {
              throw new Error('Error: Try again later');
          }

          const userProfileText = response.data.response.profileText;
          return userProfileText.includes(req.session.referralToken);
      } catch (error) {
          console.error(error);
          throw new Error('Error verifying token');
      }
  }

  async createInvite(service, email, username) {
    if (!this.externalServices.get(service)) {
        throw new Error('Invalid referral service');
    }

    // Check if user exists
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error('User not found');
    }

    // Generate invite key
    const inviteKey = crypto.randomBytes(16).toString('hex');
    const inviteExpires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days

    // Save invite to the user's invitesSent array
    user.invitesSent.push({
        email: email,
        dateSent: new Date(),
        redeemed: false
    });
    await user.save();

    // Sending email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 25,
      secure: false, // use SSL
      auth: {
          user: 'obrienk@webbhost.net',
          pass: 'oops'
      }
      
    });

    const mailOptions = {
        from: 'obrienk@webbhost.net',
        to: email,
        subject: 'You have been invited to Stellargraph',
        text: `You have been invited by ${username}. Use the following invite key to register: ${inviteKey}. The key expires on ${inviteExpires}.` // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
}

router.use(session({
    secret: 'totally-legit',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

router.get('/services-list', async (req, res) => {
    const referralService = new ReferralService();
    const services = await referralService.servicesList();
    res.json(services);
});

router.get('/generate-token', async (req, res) => {
  const referralService = new ReferralService();
  try {
      const token = await referralService.generateToken();
      res.json({ token });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.get('/verify-token', async (req, res) => {
  const { service, userId } = req.query;
  const referralService = new ReferralService();
  try {
      const isVerified = await referralService.verifyToken(service, userId);
      res.json({ isVerified });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/create-invite', async (req, res) => {
  const { service, email, username } = req.body;
  const referralService = new ReferralService();
  try {
      await referralService.createInvite(service, email, username);
      res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ Message: 'An internal server error occurred while creating the invite.', error });
  }
});

module.exports = router;