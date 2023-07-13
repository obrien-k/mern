import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAllForums from "../../../hooks/useAllForums";
import ForumCategoryList from "./ForumCategoryList";
import { clearErrors } from "../../../actions/forum"; // todo move this to errors

const ForumCategoryPage = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useAllForums();
  const { forums, forumCategories } = data;

  console.log("ForumCategoryPage - forums:", data);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error && Object.keys(error).length > 0) {
    const errorMessage = error || "An error occurred while fetching data";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <ForumCategoryList
      loading={loading}
      error={error}
      forums={forums}
      forumCategories={forumCategories}
    />
  );
};

export default ForumCategoryPage;
