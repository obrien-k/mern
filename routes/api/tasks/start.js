// Should only be run once
// Description: This file is used to create the default tasks for the application
const UserRank = require("../../../models/UserRank");
const { defaultUserRanks } = require("./defaultUserRanks");

const start = async () => {
  try {
    // Insert default user ranks
    await UserRank.insertMany(defaultUserRanks);
  } catch (err) {
    console.log(err);
  }
};
module.exports = start;
