import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForumPostsByTopicId } from "../actions/forum";

const useForumPostsByTopicId = (forumId, forumTopicId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForumPostsByTopicId(forumId, forumTopicId));
  }, [dispatch, forumId, forumTopicId]);

  const forumPosts = useSelector(
    (state) => state.forum.forumPosts[forumTopicId]
  );
  console.log("forumPosts:", forumPosts);
  const loading = useSelector((state) => state.forum.loading);

  const memoizedForumPosts = useMemo(() => forumPosts, [forumPosts]);

  return {
    forumPosts: memoizedForumPosts,
    loading,
  };
};

export default useForumPostsByTopicId;
