import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getForumById } from "../actions/forum";

const selectForumById = (state, forumId) =>
  state.forum.forums.find((forum) => forum._id === forumId);

export const useForumById = (forumId) => {
  const dispatch = useDispatch();

  const forum = useSelector((state) => selectForumById(state, forumId));
  const { error } = useSelector((state) => ({
    error: state.forum.error,
  }));

  useEffect(() => {
    if (!forum) {
      dispatch(getForumById(forumId));
    }
  }, [forumId, forum, dispatch]);

  return { data: forum, isLoading: !forum, errorMessage: error };
};
