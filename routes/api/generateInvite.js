// TODO
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const router = express.Router();

router.get('/generateInvite', async (req, res) => {
    const { interviewer_id, interviewer_name, email } = req.query;
    
    if (!interviewer_id && !interviewer_name) {
        return res.status(400).json({ error: 'Missing interviewer_id or interviewer_name' });
    }
    
    let where = interviewer_id ? { _id: mongoose.Types.ObjectId(interviewer_id) } : { username: interviewer_name };
    
    try {
        const user = await User.findOne(where);
        if (!user) {
            return res.status(404).json({ error: 'Could not find interviewer' });
        }

        const expires = Date.now() + 60 * 60 * 24 * 3; // 3 days
        const key = new mongoose.Types.ObjectId().toString(); // Generate a unique key
        const reason = "Passed Interview";

        // TODO checking email, inserting into invites collection etc.

        // Sending email using nodemailer
        if (email) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'i@stellargra.ph',
                    pass: 'default'
                }
            });

            let mailOptions = {
                from: 'i@stellargra.ph',
                to: email,
                subject: 'Stellariphic! New account confirmation',
                text: 'Your invite key is: ' + key
            };

            transporter.sendMail(mailOptions);
        }

        res.json({ key, invite_url: `${req.protocol}://${req.get('host')}/register?invite=${key}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
