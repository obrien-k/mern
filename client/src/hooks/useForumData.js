import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllForums,
  getAllForumCategories,
  getAllForumTopics,
  getForumById
} from '../actions/forum';

export const useForumData = (forumId) => {
  const dispatch = useDispatch();

  const { forum, forums, categories, topics, loading, error } = useSelector((state) => ({
    forum: state.forum.forum,
    forums: state.forum.forums,
    categories: state.forum.categories,
    topics: state.forum.topics,
    loading: state.forum.loading,
    error: state.forum.error,
  }));

  useEffect(() => {
    if (forumId) {
      dispatch(getForumById(forumId)); // Fetch data for a specific forum
    } else {
      dispatch(getAllForums()); // Fetch all forums
      dispatch(getAllForumCategories()); // Fetch all categories
      dispatch(getAllForumTopics()); // Fetch all forum topics
    }
  }, [forumId, dispatch]);

  let data;
  if (forumId) {
    data = forum; // data for a specific forum including topics
  } else {
    data = combineForumsAndCategories(forums, categories, topics); // combined data of all forums and categories
  }

  return { data, isLoading: loading, errorMessage: error };
};

const combineForumsAndCategories = (forums, categories, topics) => {
  const topicsByForumId = topics.reduce((acc, topic) => {
    const forumIdStr = topic.ForumID._id.toString();
    if (!acc[forumIdStr]) {
      acc[forumIdStr] = [];
    }
    acc[forumIdStr].push(topic);
    return acc;
  }, {});

  return categories.map(category => {
    return {
      id: category._id,
      name: category.Name,
      forums: forums.filter(forum => forum.CategoryID._id.toString() === category._id.toString())
        .map(forum => {
          const forumTopics = topicsByForumId[forum._id] || [];
          forum.NumTopics = forumTopics.length;
          forum.NumPosts = forumTopics.reduce((sum, topic) => sum + (topic.NumPosts || 0), 0);
          return {
            ...forum,
            topics: forumTopics,
          };
        }),
    };
  });
};
