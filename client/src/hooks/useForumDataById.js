import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getForumById } from '../actions/forum';

export const useForumDataById = (forumId) => {
  const dispatch = useDispatch();

  const { forum, loading, error } = useSelector((state) => ({
    forum: state.forum.forum,
    loading: state.forum.loading,
    error: state.forum.error,
  }));

  useEffect(() => {
    dispatch(getForumById(forumId));
  }, [forumId, dispatch]);

  return { data: forum, isLoading: loading, errorMessage: error };
};
