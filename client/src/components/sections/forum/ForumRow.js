import React from "react";
import { useForumById } from "../../../hooks/useForumById";
import ForumCategoryForumInfo from "./ForumCategoryForumInfo";

const ForumRow = ({ id }) => {
  const { data, isLoading, errorMessage } = useForumById(id);
  console.log(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }
  if (!data) {
    return <div>Loading forum data...</div>;
  }
  return (
    <div>
      <ForumCategoryForumInfo forum={data} />
    </div>
  );
};

export default ForumRow;
