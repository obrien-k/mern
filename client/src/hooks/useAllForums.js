import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  getAllForums,
  getAllForumCategories,
  getAllForumTopics,
} from "../actions/forum";

const selectForumCategories = (state) => state.forum.forumCategories;
const selectForums = (state) => state.forum.forums;
const selectForumTopics = (state) => state.forum.forumTopics;
const selectForumError = (state) => state.forum.error;

function getLastTopic(forum, forumTopics) {
  // Get the topics of the forum
  const topics = forumTopics[forum._id];

  // Find the topic that matches forum.lastTopic
  const lastTopic = topics?.find((topic) => topic._id === forum.lastTopic);

  return lastTopic;
}

const useAllForums = () => {
  const dispatch = useDispatch();
  const forumCategories = useSelector(selectForumCategories);
  const forums = useSelector(selectForums);
  const forumTopics = useSelector(selectForumTopics);
  const error = useSelector(selectForumError);

  useEffect(() => {
    if (forumCategories.length === 0) {
      dispatch(getAllForumCategories());
    }
    if (forums.length === 0) {
      dispatch(getAllForums());
    }
    if (Object.keys(forumTopics).length === 0) {
      forums.forEach((forum) => {
        dispatch(getAllForumTopics(forum._id));
      });
    }
  }, [forumCategories, forums, forumTopics, dispatch]);

  const forumsWithLastTopic = useMemo(() => {
    return forums.map((forum) => {
      const lastTopic = getLastTopic(forum, forumTopics);
      return { ...forum, lastTopic };
    });
  }, [forums, forumTopics]);

  return {
    data: { forums: forumsWithLastTopic, forumCategories, forumTopics },
    isLoading:
      forumsWithLastTopic.length === 0 ||
      forumCategories.length === 0 ||
      forumTopics.length === 0,
    errorMessage: error,
  };
};

export default useAllForums;
