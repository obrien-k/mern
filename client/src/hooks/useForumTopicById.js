import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getForumTopicById } from "../actions/forum";

export const useForumTopicById = (forumTopicId) => {
  const dispatch = useDispatch();

  const forumTopic = useSelector(
    (state) => state.forum.forumTopics[forumTopicId]
  );
  const error = useSelector((state) => state.forum.error);

  useEffect(() => {
    if (!forumTopic) {
      dispatch(getForumTopicById(forumTopicId));
    }
  }, [forumTopicId, forumTopic, dispatch]);

  return {
    data: forumTopic,
    isLoading: !forumTopic,
    errorMessage: error,
  };
};
