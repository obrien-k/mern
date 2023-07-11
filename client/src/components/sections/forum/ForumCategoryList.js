import React from "react";
import { Link } from "react-router-dom";
import "./Forum.css";
import ForumCategoryForumInfo from "./ForumCategoryForumInfo";

const ForumCategoryList = ({ forums, forumCategories, loading, error }) => {
  if (loading) {
    return <div>Loading forums...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!forums || forums.length === 0) {
    return <div>No forums available.</div>;
  }

  if (!forumCategories || forumCategories.length === 0) {
    return <div>No forum categories available.</div>;
  }
  return (
    <div className="thin">
      <h2>Forums</h2>

      <div className="forum-list">
        {forumCategories.map((category) => (
          <div key={category._id}>
            <h3>{category.name}</h3>
            <div className="forum_index m_table">
              <div className="forumBody">
                <div className="forumRow colhead forumHeader">
                  <div className="forumCell forumStatus"></div>
                  <div className="forumCell forumName">Forum</div>
                  <div className="forumCell forumLatest">Last Post</div>
                  <div className="forumCell forumTopics">Topics</div>
                  <div className="forumCell forumPosts">Posts</div>
                </div>

                {forums.map((forum) => {
                  if (forum.forumCategory._id === category._id) {
                    return (
                      <ForumCategoryForumInfo key={forum._id} forum={forum} />
                    );
                  }
                  return null;
                })}
              </div>{" "}
            </div>
          </div>
        ))}
      </div>
      <div className="linkbox">
        <Link to="/private/forums/catchup" className="brackets">
          Catch up
        </Link>
      </div>
    </div>
  );
};

export default ForumCategoryList;
