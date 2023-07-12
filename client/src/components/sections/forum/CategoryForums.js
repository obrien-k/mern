import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForumCategoryById } from "../../../hooks/useForumCategoryById";
import ForumRow from "./ForumRow";
import { useForumById } from "../../../hooks/useForumById";

const Forum = ({ id }) => {
  const { data: forumData, isLoading, error } = useForumById(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  return <ForumRow data={forumData} />;
};

const CategoryForums = ({ categoryId }) => {
  const {
    data: categoryData,
    isLoading,
    error,
  } = useForumCategoryById(categoryId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      {categoryData &&
        categoryData.forums &&
        categoryData.forums.map((forumId) => (
          <Forum key={forumId} id={forumId} />
        ))}
    </div>
  );
};

export default CategoryForums;
