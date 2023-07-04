import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllForums,
  getAllForumCategories,
} from '../actions/forum';

function transformData(data) {
  const categoriesMap = new Map();

  data.forEach(forum => {
    if (forum.forumCategory) {

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

  if (!forums || !categories) {
    return { isLoading: true };
  }

  const data = transformData(forums);

  return { data, isLoading, errorMessage: error };
};


