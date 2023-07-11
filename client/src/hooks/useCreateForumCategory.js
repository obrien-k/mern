import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createForumCategory } from "../actions/forum";

export const useCreateForumCategory = () => {
  const dispatch = useDispatch();

  const submitCategory = useCallback(
    (sort, name) => {
      dispatch(createForumCategory(sort, name));
    },
    [dispatch]
  );

  return { submitCategory };
};
