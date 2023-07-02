import React from 'react';
import { Link } from 'react-router-dom';
import './ForumList.css';

//todo forgot to add forum tooltip to model ?

const ForumList = ({ combinedData }) => {
  console.log(combinedData); // Add this line to check what's inside combinedData

  if (!Array.isArray(combinedData)) {
      return <div>Forums data is not available or in an unexpected format.</div>;
  }
  return (
      <div className="thin">
          <h2>Forums</h2>
          <div className="forum-list">
              {combinedData.map((category, index) => (
                  <div key={category.id}>
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
                              {category.forums.map((forum) => (
                                  <tr key={forum._id} className="forum-row">
                                      <td className="read"></td>
                                      <td className="forum">
                                          <h4>
                                              <Link to={`/forums/${forum._id}`}>{forum.Name}</Link>
                                          </h4>
                                      </td>
                                      {/* todo add forum tooltip */}
                                      <td className="latest">
                                          {forum.LastPost ? (
                                              <div>
                                                  <span className="last_post">
                                                      {/* Link to the last post */}
                                                      <Link to={`/forums/${forum.LastPost.ForumTopic._id}/posts/${forum.LastPost._id}`}>{forum.LastPost.body}</Link>
                                                  </span>
                                                  <span className="last_poster">
                                                      by <Link to={`/user/${forum.LastPost.Author._id}`}>User</Link>
                                                  </span>
                                              </div>
                                          ) : (
                                              <span>There are no topics here. <Link to={`/forums/${forum._id}/new`}>Create one!</Link></span>
                                          )}
                                      </td>
                                      <td className="number-column">{forum.NumTopics}</td>
                                      <td className="number-column">{forum.NumPosts}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              ))}
          </div>
          <div className="linkbox">
              <Link to="/forums/catchup" className="brackets">Catch up</Link>
          </div>
      </div>
  );
};

export default ForumList;
