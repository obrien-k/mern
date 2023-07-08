import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getForumTopicById } from "../actions/forum";

export const useForumTopicDataById = (forumId, forumTopicId) => {
  console.log("Hook is being called with forumId:", forumId, forumTopicId);
  const dispatch = useDispatch();

  const { forumTopic, loading, error } = useSelector((state) => ({
    forumTopic: state.forum.forumTopic,
    loading: state.forum.loading,
    error: state.forum.error,
  }));

  useEffect(() => {
    dispatch(getForumTopicById(forumId, forumTopicId));
  }, [forumId, forumTopicId, dispatch]);

  return { data: forumTopic, isLoading: loading, errorMessage: error };
};
