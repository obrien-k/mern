import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllForums,
  getAllForumCategories,
  getAllForumTopics,
  getForumById
} from '../actions/forum';

function transformData(data) {
  const categoriesMap = new Map();
  
  // Loop through each forum
  data.forEach(forum => {
    if (forum.ForumCategory) {
      const categoryId = forum.ForumCategory._id;
      const categoryName = forum.ForumCategory.Name;
      
      // If the category isn't in the map, add it
      if (!categoriesMap.has(categoryId)) {
          categoriesMap.set(categoryId, {
              _id: categoryId,
              Name: categoryName,
              Forums: []
          });
      }
      
      // Push the forum to the category's forums array
      categoriesMap.get(categoryId).Forums.push(forum);
    }
  });

  // Convert the map values to an array
  return Array.from(categoriesMap.values());
}

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
    data = transformData(forums);
    console.log('Transformed data:', data);
  }
  return { data, isLoading: loading, errorMessage: error };
};