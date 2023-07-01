const ForumTopic = require('../../../models/forum/ForumTopic');
const ForumPost = require('../../../models/forum/ForumPost');

async function fixMissingTopicID() {
  try {
    // Find all forum posts where TopicID is missing or null
    const postsToUpdate = await ForumPost.find({ TopicID: { $exists: false } });

    // Iterate through each post and find the corresponding topic
    for (const post of postsToUpdate) {
      const topic = await ForumTopic.findOne({
        ForumID: post.ForumID,
        LastPostID: post._id
      });

      if (topic) {
        // Update the post with the found topic's ID
        post.TopicID = topic._id;
        await post.save();
      }
    }

    console.log('Missing TopicID has been fixed successfully.');
  } catch (err) {
    console.error('Error fixing missing TopicID:', err);
  }
}

module.exports = fixMissingTopicID;