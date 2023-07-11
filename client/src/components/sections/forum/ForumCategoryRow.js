import React from "react";
import { useForumCategoryById } from "../../../hooks/useForumCategoryById";

const ForumCategoryRow = ({ id, userClassLevel }) => {
  const { data, isLoading, errorMessage } = useForumCategoryById(id);

  if (isLoading) {
    return <div>Loading..c</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }
  if (userClassLevel) {
    console.log("todo" + userClassLevel);
  }
  return (
    <div class="forum_index m_table" key={data._id}>
      <h3>{data.name}</h3>
      <div class="forumRow colhead forumHeader">
        <div class="forumCell forumStatus"></div>
        <div className="">Forum</div>
        <div class="forumCell forumLatest">Last Post</div>
        <div class="forumCell forumReplies">Topics</div>
        <div class="forumCell forumAuthor">Posts</div>
      </div>
    </div>
  );
};

export default ForumCategoryRow;
