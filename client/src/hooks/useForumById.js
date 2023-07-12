import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getForumById } from "../actions/forum";

const selectForumById = createSelector(
  (state, forumId) => state.forum.forumsById[forumId],
  (forum) => forum
);

export const useForumById = (forumId) => {
  const dispatch = useDispatch();
  console.log("Requested forumId:", forumId);
  const forum = useSelector((state) => {
    console.log("Current state.forumsById:", state.forum.forumsById);
    return selectForumById(state, forumId);
  });

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
