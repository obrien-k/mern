//useAllForums.js
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  getAllForums,
  getAllForumCategories,
  getAllForumTopics,
  getForumPostById,
} from "../actions/forum";

const selectForumCategories = (state) => state.forum.forumCategories;
const selectForums = (state) => state.forum.forums;
const selectForumTopics = (state) => state.forum.forumTopics;
const selectForumPosts = (state) => state.forum.forumPosts;
const selectForumError = (state) => state.forum.error;

function getLastTopic(forum, forumTopics) {
  // Get the topics of the forum
  const topics = forumTopics[forum._id];
  console.log("topics", topics);
  // Find the topic that matches forum.lastTopic
  const lastTopic = topics?.find((topic) => topic._id === forum.lastTopic);
  console.log("lastTopic", lastTopic);
  return lastTopic;
}

const useAllForums = () => {
  const dispatch = useDispatch();
  const forumCategories = useSelector(selectForumCategories);
  const forums = useSelector(selectForums);
  const forumTopics = useSelector(selectForumTopics);
  const forumPosts = useSelector(selectForumPosts);
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
    forums.forEach((forum) => {
      const lastTopic = getLastTopic(forum, forumTopics);
      if (lastTopic && lastTopic.lastPost) {
        dispatch(
          getForumPostById(forum._id, lastTopic._id, lastTopic.lastPost)
        );
      }
    });
  }, [forumCategories, forums, forumTopics, dispatch]);

  const forumsWithLastTopicAndPost = useMemo(() => {
    return forums.map((forum) => {
      const lastTopic = getLastTopic(forum, forumTopics);
      const lastPostForTopic = lastTopic
        ? forumPosts[lastTopic.lastPost]
        : null;
      return { ...forum, lastTopic, lastPost: lastPostForTopic };
    });
  }, [forums, forumTopics, forumPosts]);

  return {
    data: { forums: forumsWithLastTopicAndPost, forumCategories, forumTopics },
    isLoading:
      forumsWithLastTopicAndPost.length === 0 ||
      forumCategories.length === 0 ||
      forumTopics.length === 0,
    errorMessage: error,
  };
};

export default useAllForums;
