const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../../../../middleware/auth");
const { asyncHandler } = require("../../../../middleware/asyncHandler");
const Group = require("../../../../models/community/Group");

// @route   GET api/communities/:communityId/groups
// @desc    Get all groups within a community
// @access  Public
router.get(
  "/",
  auth(),
  asyncHandler(async (req, res) => {
    const { communityId } = req.params;
    const groups = await Group.find({ community: communityId }).populate(
      "community",
      "name"
    );
    res.json(groups);
  })
);

// @route   PUT api/communities/:communityId/groups/:groupId
// @desc    Update an existing group within a community
// @access  Private
router.put(
  "/:communityId/groups/:groupId",
  auth(),
  asyncHandler(async (req, res) => {
    const { communityId, groupId } = req.params;
    let group = await Group.findOne({ _id: groupId, community: communityId });

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    group = await Group.findByIdAndUpdate(groupId, req.body, { new: true });
    res.json(group);
  })
);

// @route   POST api/communities/:communityId/groups
// @desc    Create a new group within a community
// @access  Private
router.post(
  "/:communityId/groups",
  asyncHandler(async (req, res) => {
    const { communityId } = req.params;
    const { artist, title, tags, description, contributors, type } = req.body;

    // Input Validation
    if (!artist || !title || !tags || !description || !contributors || !type) {
      return res
        .status(400)
        .json({ msg: "Please include all required fields" });
    }

    // Check if community exists
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    // Creating a new group
    const newGroup = new Group({
      artist,
      title,
      tags,
      description,
      community: communityId,
      contributors,
      type,
    });

    const group = await newGroup.save();
    community.groups.push(group._id);
    await community.save();

    // Use status 201 for resource creation
    res.status(201).json(group);
  })
);

// @route   DELETE api/communities/:communityId/groups/:groupId
// @desc    Delete an existing group within a community
// @access  Private
router.delete(
  "/:communityId/groups/:groupId",
  auth(),
  asyncHandler(async (req, res) => {
    const { communityId, groupId } = req.params;
    const group = await Group.findOne({ _id: groupId, community: communityId });

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    await Group.findByIdAndRemove(groupId);
    res.json({ msg: "Group deleted" });
  })
);

module.exports = router;
