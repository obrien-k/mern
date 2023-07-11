import React from "react";
import useAllForums from "../../../hooks/useAllForums";
import ForumCategoryList from "./ForumCategoryList";

const ForumCategoryPage = () => {
  const { loading, error, data } = useAllForums();
  const { forums, forumCategories } = data;

  console.log("ForumCategoryPage - forums:", data); // Add this console log

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
