import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllForums,
  getAllForumCategories,
} from '../actions/forum';

function transformData(data) {
  const categoriesMap = new Map();

  data.forEach(forum => {
    console.log("Processing forum:", forum);
    
    if (forum.ForumCategory) {
      console.log("ForumCategory property of forum:", forum.ForumCategory); // Log here
      
      const categoryId = forum.ForumCategory._id;
      const categoryName = forum.ForumCategory.Name;

      if (categoryId && categoryName && !categoriesMap.has(categoryId)) {
        categoriesMap.set(categoryId, {
          _id: categoryId,
          Name: categoryName,
          Forums: []
        });
      }

      if (categoriesMap.has(categoryId)) {
        categoriesMap.get(categoryId).Forums.push(forum);
      }
    }
  });

  const transformedData = Array.from(categoriesMap.values());
  console.log("Transformed categoriesMap:", categoriesMap);
  console.log("Transformed data array:", transformedData);
  return transformedData;
}


export const useAllForumsData = () => {
  const dispatch = useDispatch();

  const { forums, categories, loadingForums, loadingCategories, error } = useSelector((state) => ({
    forums: state.forum.forums,
    categories: state.forum.categories,
    loadingForums: state.forum.loadingForums,
    loadingCategories: state.forum.loadingCategories,
    error: state.forum.error,
  }));

  const isLoading = loadingForums || loadingCategories;

  useEffect(() => {
    dispatch(getAllForums());
    dispatch(getAllForumCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log('Forums data has changed:', forums);
  }, [forums]);   

  console.log("Forums from redux:", forums);
  console.log("Categories from redux:", categories);

  if (!forums || !categories) {
    return { isLoading: true };
  }

  const data = transformData(forums);

  console.log("Transformed data:", data);
  
  return { data, isLoading, errorMessage: error };
};


