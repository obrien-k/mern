import React from 'react';
import { Link } from 'react-router-dom';
import './ForumList.css';

//todo forgot to add forum tooltip to model ?

const ForumList = ({ forums }) => {
  if (!Array.isArray(forums)) {
    return <div>Forums data is not available or in unexpected format.</div>;
  }
    return (
            <div className="thin">
                <h2>Forums</h2>
                <div className="forum-list">
                    {forums.map((category, index) => (
                        <div key={index}>
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
                                        <tr key={forum.id} className={forum.rowClass}>
                                            <td className="read"></td>
                                            <td className="forum">
                                                <h4>
                                                    <Link to={`/forums/${forum.id}`}>{forum.name}</Link>
                                                </h4>
                                            </td>
                                            <td className="latest">
                                                {forum.latestPost ? (
                                                    <div> 
                                                        <span className="last_topic">
                                                            <Link to={`/forums/${forum.id}/threads/${forum.latestPost.threadId}`} className="tooltip" data-title-plain={forum.latestPost.title}>
                                                                {forum.latestPost.title}
                                                            </Link>
                                                        </span>
                                                        <span className="tooltip last_read">
                                                            <Link to={`/forums/${forum.id}/threads/${forum.latestPost.threadId}?page=1#post${forum.latestPost.postId}`}></Link>
                                                        </span>
                                                        <span className="last_poster">
                                                            by <Link to={`/user/${forum.latestPost.authorId}`}>{forum.latestPost.author}</Link>
                                                            <span className="time tooltip">{forum.latestPost.timeAgo}</span>
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span>There are no topics here. <Link to={`/forums/${forum.id}/new`}>Create one!</Link></span>
                                                )}
                                            </td>

                                            <td className="number-column">{forum.topicCount}</td>
                                            <td className="number-column">{forum.postCount}</td>
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
