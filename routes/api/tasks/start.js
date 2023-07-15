const User = require("../../../models/User");
const UserRank = require("../../../models/UserRank");
const { defaultUserRanks } = require("./defaultUserRanks");
const { defaultSysOp } = require("./defaultSysOp");

const start = async () => {
  try {
    // Insert default user ranks
    const insertedRanks = await UserRank.insertMany(defaultUserRanks);

    // Find the SysOp user rank
    const sysOpRank = insertedRanks.find((rank) => rank.field2 === "SysOp");

    // Check if sysOpRank exists
    if (!sysOpRank) {
      throw new Error("SysOp UserRank not found");
    }

    // Create the default SysOp user with the SysOp user rank's _id as the userRank field
    defaultSysOp.userRank = sysOpRank._id;
    const createdSysOp = await User.create(defaultSysOp);
  } catch (err) {
    console.log(err);
  }
};

module.exports = start;
