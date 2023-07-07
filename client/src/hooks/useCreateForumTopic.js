// hooks/useCreateForumTopic.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createForumTopic } from '../actions/forum';

export const useCreateForumTopic = () => {
  const dispatch = useDispatch();

  const submitTopic = useCallback(
    (title, forumId, body, question, answers) => {
      dispatch(createForumTopic(title, forumId, body, question, answers));
    },
    [dispatch]
  );

  return { submitTopic };
};
