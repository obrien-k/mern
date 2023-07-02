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
      console.log('forumId???')
      // not workingdispatch(getForumById(forumId)); // Fetch data for a specific forum
    } else {
      dispatch(getAllForums()); // Fetch all forums
      dispatch(getAllForumCategories()); // Fetch all categories
      dispatch(getAllForumTopics()); // Fetch all forum topics
    }
  }, [forumId, dispatch]);
  console.log('Raw forums data:', forums);
  console.log('Raw categories data:', categories);
  console.log('Raw topics data:', topics);
  let data;
  if (forumId) {
    console.log("if forumId");
    data = forum;
    console.log(data);
    console.log("endif forumId");
  } else {
    if (!forums || !categories) {
      return { isLoading: true };  // Return early if forums or categories are not loaded
    }
    data = combineForumsAndCategories(forums, categories);
    console.log('Combined data:', data);
  }
  return { data, isLoading: loading, errorMessage: error };
};
function combineForumsAndCategories(forums, categories) {
  // Map through each category
  return categories.map(category => {
    // Filter the forums that belong to the current category
    const categoryForums = forums.filter(forum => forum.ForumCategory._id === category._id);

    // Return a new object representing the category with its forums included
    return {
      ...category,
      forums: categoryForums
    };
  });
}

{/* Reverting to forums/categories only */}
{/* 
const combineForumsAndCategoriesandTopics = (forums, categories, topics) => {
  if (!Array.isArray(forums) || !Array.isArray(categories) || !Array.isArray(topics)) {
    return [];
  }
  
  // Group topics by ForumID
  const topicsByForumId = topics.reduce((acc, topic) => {
    if (topic.forumId) {
      const forumIdStr = topic.forumId.toString();
      if (!acc[forumIdStr]) {
        acc[forumIdStr] = [];
      }
      acc[forumIdStr].push(topic);
    }
    return acc;
  }, {});

  // Construct combined data
  return categories.map(category => {
    const categoryForums = forums.filter(forum => 
      forum.categoryId && forum.categoryId._id && 
      forum.categoryId._id.toString() === category._id.toString()
    );
    
    return {
      id: category._id,
      name: category.name,
      forums: categoryForums.map(forum => ({
        ...forum,
        topics: topicsByForumId[forum._id] || []
      }))
    };
  });
};
*/}
