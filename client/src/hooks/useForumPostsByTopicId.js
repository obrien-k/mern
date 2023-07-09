import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForumPostsByTopicId } from "../actions/forum";

const useForumPostsByTopicId = (forumId, forumTopicId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForumPostsByTopicId(forumId, forumTopicId));
  }, [dispatch, forumId, forumTopicId]);

  const forumPosts = useSelector((state) => state.forum.forumPosts);
  const loading = useSelector((state) => state.forum.loading);

  return {
    forumPosts,
    loading,
  };
};

export default useForumPostsByTopicId;
