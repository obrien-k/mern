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
    
    if (forum.forumCategory) {
      console.log("forumCategory property of forum:", forum.forumCategory); // Log here
      
      const categoryId = forum.forumCategory._id;
      const categoryName = forum.forumCategory.name;

      if (categoryId && categoryName && !categoriesMap.has(categoryId)) {
        categoriesMap.set(categoryId, {
          _id: categoryId,
          name: categoryName,
          forums: []
        });
      }

      if (categoriesMap.has(categoryId)) {
        categoriesMap.get(categoryId).forums.push(forum);
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


