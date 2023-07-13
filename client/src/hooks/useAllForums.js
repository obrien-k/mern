import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  getAllForums,
  getAllForumCategories,
  getAllForumTopics,
} from "../actions/forum";

const selectAllForumCategories = createSelector(
  (state) => state.forum.forumCategories,
  (forumCategories) => forumCategories
);

const selectAllForums = createSelector(
  (state) => state.forum.forums,
  (forums) => forums
);

const selectAllForumTopics = createSelector(
  (state) => state.forum.forumTopics,
  (forumTopics) => forumTopics
);

// Memoized selector to get all forums with their most recent topic
const selectForumsWithTopics = createSelector(
  selectAllForums,
  selectAllForumTopics,
  (forums, forumTopics) =>
    forums.map((forum) => {
      const topicsForThisForum = forumTopics[forum._id];
      const mostRecentTopic = topicsForThisForum ? topicsForThisForum[0] : null;
      return {
        ...forum,
        mostRecentTopic,
      };
    })
);

const useAllForums = () => {
  const dispatch = useDispatch();
  const forumCategories = useSelector(selectAllForumCategories);
  const forums = useSelector(selectAllForums);
  const forumTopics = useSelector(selectAllForumTopics);
  const forumsWithTopics = useSelector(selectForumsWithTopics);

  const { error } = useSelector((state) => ({ error: state.forum.error }));

  useEffect(() => {
    if (forumCategories.length === 0) {
      dispatch(getAllForumCategories());
    }
    if (forums.length === 0) {
      dispatch(getAllForums()).then(() => {
        forums.forEach((forum) => {
          dispatch(getAllForumTopics(forum._id));
        });
      });
    }
  }, [forumCategories, forums, dispatch]);

  return {
    data: { forums: forumsWithTopics, forumCategories, forumTopics },
    isLoading:
      forumsWithTopics.length === 0 ||
      forumCategories.length === 0 ||
      forumTopics.length === 0,
    errorMessage: error,
  };
};

export default useAllForums;
