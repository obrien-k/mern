const Forum = require("../../../models/forum/Forum");
const ForumCategory = require("../../../models/forum/ForumCategory");
const ForumTopic = require("../../../models/forum/ForumTopic");
const { forumTopics, forums, forumCategories } = require("./forumSeedData");

const generateTestData = async () => {
  try {
    // Insert Forums and wait for the promise to resolve
    const insertedForums = await Forum.insertMany(forums);

    console.log("Inserted Forums:", insertedForums);

    // Map forums' ObjectIds to forumTopics
    const forumTopicsWithForumIds = forumTopics.map((topic, index) => {
      return {
        ...topic,
        ForumID: insertedForums[index % insertedForums.length]._id,
      };
    });

    console.log("Forum Topics with Forum IDs:", forumTopicsWithForumIds);
    // Insert forumTopics with populated ForumIDs
    await ForumTopic.insertMany(forumTopicsWithForumIds);

    // Insert Forum Categories
    await ForumCategory.insertMany(forumCategories);

    console.log("Test data generated successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateTestData;
