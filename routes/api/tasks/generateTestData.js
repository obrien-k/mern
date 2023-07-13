const Forum = require("../../../models/forum/Forum");
const ForumCategory = require("../../../models/forum/ForumCategory");
const ForumTopic = require("../../../models/forum/ForumTopic");
const { forumTopics, forums, forumCategories } = require("./forumSeedData");

const generateTestData = async () => {
  try {
    // Insert Forum Categories
    const forumCategoriesData = await ForumCategory.insertMany(forumCategories);

    // Insert Forums and wait for the promise to resolve
    const insertedForums = await Forum.insertMany(forums);

    console.log("Inserted Forums:", insertedForums);
    // add new forums to categories
    if (forumCategoriesData.length > 0) {
      for (let i = 0; i < forumCategoriesData.length; i++) {
        const forumCategory = forumCategoriesData[i];

        // Find the inserted forums that belong to this category
        const insertedForumsOfCategory = insertedForums.filter(
          (forum) =>
            forum.forumCategory.toString() === forumCategory._id.toString()
        );

        // Extract their ids
        const forumIds = insertedForumsOfCategory.map((forum) => forum._id);

        // Update the category with these forum ids
        await ForumCategory.findByIdAndUpdate(forumCategory._id, {
          $set: { forums: forumIds },
        });
      }
    }
    /* need to fix
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
    */

    console.log("Test data generated successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateTestData;
