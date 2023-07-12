import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  getAllForums,
  getAllForumCategories,
  getAllForumTopics,
} from "../actions/forum";

// Selector to get all forums
const selectAllForums = createSelector(
  (state) => state.forum.forums,
  (forums) => forums
);

// Selector to get all forum categories
const selectAllForumCategories = createSelector(
  (state) => state.forum.forumCategories,
  (forumCategories) => forumCategories
);

// Selector to get all forum topics
const selectAllForumTopics = createSelector(
  (state) => state.forum.forumTopics,
  (forumTopics) => forumTopics
);

const useAllForums = () => {
  const dispatch = useDispatch();
  const forums = useSelector(selectAllForums);
  const forumCategories = useSelector(selectAllForumCategories);
  const forumTopics = useSelector(selectAllForumTopics);
  const { error } = useSelector((state) => ({ error: state.forum.error }));

  const [forumsWithTopics, setForumsWithTopics] = useState([]);

  useEffect(() => {
    if (forums.length === 0) {
      dispatch(getAllForums());
    }
    if (forumCategories.length === 0) {
      dispatch(getAllForumCategories());
    }
  }, [forums, forumCategories, dispatch]);

  useEffect(() => {
    const fetchForumTopics = async () => {
      const topicPromises = forums.map(async (forum) => {
        if (forum.forumTopics) {
          await dispatch(getAllForumTopics(forum._id));
        }
      });

      await Promise.all(topicPromises);
    };

    if (forums.length > 0) {
      fetchForumTopics();
    }
  }, [forums, dispatch]);

  useEffect(() => {
    if (forums.length > 0) {
      const mapTopicsToForum = forums.map((forum) => {
        let topic = null;
        if (Array.isArray(forumTopics)) {
          topic = forumTopics.find((topic) => topic.forum === forum._id);
        }
        return {
          ...forum,
          mostRecentTopic: topic || null, // fallback to null if there are no topics
        };
      });

      setForumsWithTopics(mapTopicsToForum);
    }
  }, [forumTopics, forums]);

  return {
    data: { forums: forumsWithTopics, forumCategories, forumTopics },
    isLoading:
      forumsWithTopics.length === 0 ||
      forumCategories.length === 0 ||
      Object.keys(forumTopics).length === 0,
    errorMessage: error,
  };
};

export default useAllForums;
