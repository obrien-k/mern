const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route GET api/auth/status
// @desc  Check if user is authenticated
// @access Public
router.get("/status", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      // Return 403 status when there is no token
      return res.status(403).json({ isAuthenticated: false });
    }

    jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
      if (err) {
        // Return 403 status when token verification fails
        return res.status(403).json({ isAuthenticated: false });
      } else {
        // Return the user ID alongside the authentication status
        return res.json({ isAuthenticated: true, user: { id: decoded.id } });
      }
    });
  } catch (err) {
    console.error(err.message);
    // Return 500 status in case of server error
    return res.status(500).json({ isAuthenticated: false });
  }
});

// @route   GET api/auth/logout
// @desc    Log out the user
// @access  Private
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "User logged out" });
});

// @route GET api/auth
// @desc Test route
// @access Public
router.get("/", auth(), async (req, res) => {
  try {
    console.log("Inside GET /api/auth route");

    if (!req.user || !req.user.id) {
      console.log("User not found in request");
      return res.status(401).send("Unauthorized");
    }

    const userId = req.user.id;
    console.log(`Fetching user with ID: ${userId}`);

    const user = await User.findById(userId).select("-password");

    console.log("User fetched:", user);
    res.json(user);
  } catch (err) {
    console.error("Error in GET /api/auth:", err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/auth
// @desc  Authenticate user & get token
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // User matched
      // Create JWT Payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          // set token in cookie
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
          });
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
