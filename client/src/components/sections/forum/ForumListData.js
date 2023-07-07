import React from "react";
import useAllForumsData from "../../../hooks/useAllForumsData";
import ForumList from "./ForumList";

const ForumListData = () => {
  const { loading, error, forums, forumCategories } = useAllForumsData();
  console.log("ForumListData - forums:", forums); // Add this console log

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && Object.keys(error).length > 0) {
    const errorMessage = error || "An error occurred while fetching data";
    return <div>Error: {errorMessage}</div>;
  }
  return (
    <ForumList
      loading={loading}
      error={error}
      forums={forums}
      forumCategories={forumCategories}
    />
  );
};

export default ForumListData;
