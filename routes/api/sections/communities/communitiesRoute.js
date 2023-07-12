const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const { asyncHandler } = require("../../../../middleware/asyncHandler");
const Community = require("../../../../models/community/Community");
const communityGroup = require("./communityGroup");

// @route   GET api/communities
// @desc    Get all communities
// @access  Public
router.get(
  "/",
  auth(),
  asyncHandler(async (req, res) => {
    const communities = await Community.find();
    console.log(communities);
    res.json(communities);
  })
);

// @route   GET api/communities/:communityId/groups
// @desc    Get all forum topics
// @access  Private
router.use(
  "/:communityId/groups",
  (req, res, next) => {
    next();
  },
  communityGroup
);

// @route   POST api/communities
// @desc    Create a new community
// @access  Private
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, groups, comments, registration_status, type, staff } =
      req.body;

    // Creating a new community
    const newCommunity = new Community({
      name,
      groups,
      comments,
      registration_status,
      type,
      staff,
    });

    const community = await newCommunity.save();
    res.json(community);
  })
);

// @route   GET api/communities/:id
// @desc    Get community by id
// @access  Public
router.get(
  "/:id",
  auth(),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const community = await Community.findById(id);
    res.json(community);
  })
);

module.exports = router;
