const Forum = require('../../../models/forum/Forum');
const ForumTopic = require('../../../models/forum/ForumTopic');

async function populateForumTopics() {
  try {
    // Find all forums
    const forums = await Forum.find();

    // Iterate through each forum and populate the ForumTopics array
    for (const forum of forums) {
      const topics = await ForumTopic.find({ ForumID: forum._id });

      // Get the array of topic IDs
      const topicIDs = topics.map(topic => topic._id);

      // Update the Forum document with the array of topic IDs
      forum.ForumTopics = topicIDs;

      await forum.save();
    }

    console.log('ForumTopics have been populated successfully.');
  } catch (err) {
    console.error('Error populating ForumTopics:', err);
  }
}

module.exports = populateForumTopics;
