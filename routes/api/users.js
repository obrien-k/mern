const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const UserRank = require("../../models/UserRank");
const Profile = require("../../models/profile/Profile");
const Personal = require("../../models/profile/settings/Personal");
const SiteAppearance = require("../../models/profile/settings/SiteAppearance");
const { asyncHandler } = require("../../middleware/asyncHandler");

// @route GET api/users/:id
// @desc Get user by ID
// @access Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate("profile")
      .populate("userRank", "field2")
      .exec();

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user.toObject({ virtuals: true }));
  })
);

router.post(
  "/",
  [
    check("username", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    // assign default user rank
    const defaultRank = await UserRank.findOne({ field1: 100 });

    if (!defaultRank) {
      throw new Error("Default rank not found");
    }

    // Start session
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      user = new User({
        username,
        email,
        avatar,
        password,
        userRank: defaultRank._id,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save({ session });
      //todo handle when username already exists

      // create new personal info with default values
      const newPersonal = new Personal();
      const personalDoc = await newPersonal.save({ session });

      // create new siteAppearance with default values
      const newSiteAppearance = new SiteAppearance();
      const siteAppearanceDoc = await newSiteAppearance.save({ session });

      // create new profile
      const profile = new Profile({
        user: user._id,
        personal: personalDoc._id,
        siteAppearance: siteAppearanceDoc._id,
      });

      const profileDoc = await profile.save({ session });

      // Commit transaction if everything is okay
      await session.commitTransaction();
      session.endSession();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, profile: profileDoc });
        }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  })
);

module.exports = router;
