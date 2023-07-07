import React from "react";
import { Link } from "react-router-dom";
import "./Forum.css";

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
            <table className="forum-index">
              <thead>
                <tr className="colhead">
                  <th></th>
                  <th className="forum-name">Forum</th>
                  <th>Last Post</th>
                  <th className="number-column topics">Topics</th>
                  <th className="number-column posts">Posts</th>
                </tr>
              </thead>
              <tbody>
                {forums
                  .filter((forum) => forum.forumCategory._id === category._id)
                  .map((forum) => (
                    <tr key={forum._id} className="forum-row">
                      <td className="read"></td>
                      <td className="forum">
                        <h4>
                          <Link to={`/private/forums/${forum._id}`}>
                            {forum.name}
                          </Link>
                        </h4>
                      </td>
                      <td className="latest">
                        {forum.mostRecentTopic ? (
                          <div>
                            <span className="last_post">
                              {/* Link to the last post */}
                              <Link
                                to={`/private/forums/${forum._id}/topics/${forum.mostRecentTopic._id}`}
                              >
                                {forum.mostRecentTopic.title}
                              </Link>
                            </span>
                            <span className="last_poster">
                              by{" "}
                              <Link
                                to={`/private/user/${forum.mostRecentTopic.author}`}
                              >
                                User
                              </Link>
                            </span>
                          </div>
                        ) : (
                          <span>
                            There are no topics here.{" "}
                            <Link to={`/private/forums/${forum._id}/new`}>
                              Create one!
                            </Link>
                          </span>
                        )}
                      </td>
                      <td className="number-column">{forum.numTopics}</td>
                      <td className="number-column">{forum.numPosts}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
