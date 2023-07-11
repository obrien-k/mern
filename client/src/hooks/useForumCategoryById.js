import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getForumCategoryById } from "../actions/forum";

export const useForumCategoryById = (forumCategoryId) => {
  const dispatch = useDispatch();

  const forumCategory = useSelector(
    (state) => state.forum.forumCategories[forumCategoryId]
  );
  const { error } = useSelector((state) => ({
    error: state.forum.error,
  }));

  useEffect(() => {
    if (!forumCategory) {
      dispatch(getForumCategoryById(forumCategoryId));
    }
  }, [forumCategoryId, forumCategory, dispatch]);

  return {
    data: forumCategory,
    isLoading: !forumCategory,
    errorMessage: error,
  };
};
