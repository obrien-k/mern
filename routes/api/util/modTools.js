const express = require('express');
const router = express.Router();
const User = require('../../../models/User');


// tools/mod endpoint
router.post('/mod', async (req, res) => {
    const { userIds, adminComment, banReason } = req.body;
    try {  console.log(req.body)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/disable', async (req, res) => {
    const { userIds, adminComment, banReason } = req.body;
    try {
        const ids = Array.isArray(userIds) ? userIds : [userIds];
        const updatedUsers = await User.updateMany(
            { userId: { $in: ids } },
            {
                isEnabled: false,
                canLeech: false,
                adminComment,
                banDate: new Date(),
                banReason,
                ratioWatchDownload: banReason === 2 ? 'm.Downloaded' : 0
            }
        );
        res.json(updatedUsers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/warn', async (req, res) => {
  const { userId, duration, reason } = req.body;
  try {
      const user = await User.findById(userId); // Find the user by ID

      if (user.warned !== '0000-00-00 00:00:00') {
          // User was already warned, appending new warning to old
          const oldDate = new Date(user.warned);
          const newExpDate = new Date(oldDate.getTime() + duration * 1000);

          // TODO: Implement the send_pm function

          const adminComment = `${new Date().toISOString().slice(0, 10)} - Warning (Clash) extended to expire at ${newExpDate.toISOString()} by ${req.user.username}\nReason: ${reason}\n\n`;

          await User.findByIdAndUpdate(userId, {
              warned: newExpDate,
              $inc: { warnedTimes: 1 },
              $push: { adminComment: adminComment }
          });
      } else {
          // Not changing, user was not already warned
          const warnTime = new Date(Date.now() + duration * 1000);

          const adminComment = `${new Date().toISOString().slice(0, 10)} - Warned until ${warnTime.toISOString()} by ${req.user.username}\nReason: ${reason}\n\n`;

          await User.findByIdAndUpdate(userId, {
              warned: warnTime,
              $inc: { warnedTimes: 1 },
              $push: { adminComment: adminComment }
          });
      }

      res.status(200).json({ message: 'User warned successfully' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

router.post('/update-notes', async (req, res) => {
    const { userId, adminComment } = req.body;
    try {
        const user = await User.findOne({ userId });
        user.adminComment = adminComment + user.adminComment;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});