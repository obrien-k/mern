import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForumDataById } from '../../../hooks/useForumDataById';
import './ForumList.css';

const ForumPage = () => {
  const { forumId } = useParams();
  const { data: forum, isLoading, errorMessage } = useForumDataById(forumId); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }

  if (!forum) {
    return <div>Forum not found</div>;
  }

  console.dir(forum);
  return (
    <div className="thin">
      <h2>
        <Link to="/private/forums">Forums</Link> &gt; {forum.name}
      </h2>
      <div className="linkbox">
        <Link to={`/private/forums/${forum._id}/new`} className="brackets">
          New thread
        </Link>
        {/* Add more links as needed */}
      </div>
      <table className="forum_index m_table" width="100%">
        <tbody>
          <tr className="colhead">
            <td style={{ width: '2%' }}></td>
            <td className="m_th_left">Latest</td>
            <td className="m_th_right" style={{ width: '7%' }}>
              Replies
            </td>
            <td style={{ width: '14%' }}>Author</td>
          </tr>
          {forum.forumTopics && forum.forumTopics.length > 0 ? (
            forum.forumTopics.map((topic) => (
              <tr key={topic.id} className="rowb">
              <td className="td_read read tooltip"></td>
              <td className="td_latest">
                <span className="last_topic">
                  <strong>
                    <Link
                      to={`/private/forums/${forum._id}/${topic._id}`}
                      className="tooltip"
                    >
                      {topic.title}
                    </Link>
                  </strong>
                </span>
                <span className="last_poster">
                  by <Link to={`/private/user/${topic.authorId}`}>{topic.author}</Link>{' '}
                  <span className="time tooltip">{topic.lastPostTime}</span>
                </span>
              </td>
              <td className="td_replies number_column m_td_right">{topic.numReplies}</td>
              {/* Add more columns as needed */}
            </tr>
            ))
          ) : (
            <tr>
              <td colspan="4">No threads to display in this forum!</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="linkbox pager">{/* Add pager links here */}</div>
      <div className="linkbox">
        <Link
          to={`/private/forums/catchup/${forum._id}`}
          className="brackets"
        >
          Catch up
        </Link>
      </div>
    </div>
  );
};

export default ForumPage;
