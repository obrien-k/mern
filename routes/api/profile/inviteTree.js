const express = require("express");
const InviteTree = require("../../../models/profile/InviteTree");
const router = express.Router();

const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const userId = req.query.userId; // Get the user ID from the query parameters

  try {
    // Convert the userId string to an ObjectID
    const objectId = mongoose.Types.ObjectId(userId);

    // Aggregate the data
    const inviteTreeData = await InviteTree.aggregate([
      {
        $match: { UserID: objectId },
      },
      {
        $lookup: {
          from: "users", // Assuming the collection for user data is called 'users'
          localField: "UserID",
          foreignField: "_id", // Assuming the primary key in the users collection is '_id'
          as: "userDetails",
        },
      },
      {
        $lookup: {
          from: "invites",
          let: { inviterId: "$InviterID" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$InviterID", "$$inviterId"] },
                    { $ne: ["$Email", null] }, // Exclude pending invites without an email
                  ],
                },
              },
            },
          ],
          as: "sentInvitations",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          TreePosition: 1,
          TreeID: 1,
          TreeLevel: 1,
          InviterID: 1,
          username: "$userDetails.username",
          email: "$userDetails.email",
          joined: "$userDetails.joined",
          lastSeen: "$userDetails.lastSeen",
          uploaded: "$userDetails.uploaded",
          downloaded: "$userDetails.downloaded",
          ratio: "$userDetails.ratio",
        },
      },
      {
        $sort: { TreePosition: 1 },
      },
    ]);

    // Constructing the hierarchical tree and calculate statistics
    let treeData = [];
    let stats = {
      totalEntries: 0,
      totalBranches: 0,
      totalDepth: 0,
      totalUpload: 0,
      totalDownload: 0,
      topLevelUpload: 0,
      topLevelDownload: 0,
      disabledCount: 0,
      donorCount: 0,
      paranoidCount: 0,
    };

    let positionMap = new Map();

    // Function to convert size into human-readable format (bytes to MB, GB, etc.)
    function formatSize(size) {
      const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
      return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "KB", "MB", "GB", "TB"][i]
      );
    }

    inviteTreeData.forEach((entry) => {
      stats.totalEntries++;

      const parentPosition = entry.TreePosition.slice(0, -1); // Parent position is current position without last character
      const currentLevel = entry.TreeLevel;

      const treeNode = {
        userId: entry.UserID,
        treePosition: entry.TreePosition,
        treeLevel: entry.TreeLevel,
        username: entry.username,
        email: entry.email,
        uploaded: entry.uploaded,
        downloaded: entry.downloaded,
        ratio: entry.ratio,
        isDonor: entry.Donor,
        isEnabled: entry.Enabled,
        children: [],
      };

      if (entry.isEnabled === false) {
        stats.disabledCount++;
      }

      if (entry.Donor) {
        stats.donorCount++;
      }

      // If currentLevel is one more than parent, it is a direct child, else it's a sibling or higher
      if (
        currentLevel > 1 &&
        currentLevel === positionMap.get(parentPosition).treeLevel + 1
      ) {
        positionMap.get(parentPosition).children.push(treeNode);
      } else {
        treeData.push(treeNode);
      }

      positionMap.set(entry.TreePosition, treeNode);

      if (currentLevel === 2) {
        stats.totalBranches++;
        stats.topLevelUpload += entry.uploaded;
        stats.topLevelDownload += entry.downloaded;
      }

      stats.totalUpload += entry.uploaded;
      stats.totalDownload += entry.downloaded;
    });

    stats.totalDepth =
      inviteTreeData.length > 0 ? inviteTreeData[0].TreeLevel : 0;

    // Returning the structured tree data along with the calculated statistics
    res.json({
      success: true,
      data: treeData,
      stats: {
        ...stats,
        totalUpload: formatSize(stats.totalUpload),
        totalDownload: formatSize(stats.totalDownload),
        topLevelUpload: formatSize(stats.topLevelUpload),
        topLevelDownload: formatSize(stats.topLevelDownload),
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "An error occurred while retrieving invite tree data.",
    });
  }
});

module.exports = router;
