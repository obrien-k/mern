import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForumData } from '../../../hooks/useForumData';
import './ForumList.css';

const ForumPage = () => {
  const { forumId } = useParams();
  
  const { data: forumData, isLoading, errorMessage } = useForumData(forumId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }
  
  if (!forumData || !forumData.topics) {
    return <div>No data available</div>;
  }

  return (
    <div className="thin">
      <h2>
        <Link to="/forums">Forums</Link> &gt; {forumData.name}
      </h2>
      <div className="linkbox">
        <Link to={`/forums/topics/${forumData.id}/new-topic`} className="brackets">
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
          {forumData.topics.map((topic) => (
            <tr key={topic.id} className="rowb">
              <td className="td_read read tooltip"></td>
              <td className="td_latest">
                <span style={{ float: 'left' }} className="last_topic">
                  <strong>
                    <Link
                      to={`/forums/viewthread?threadid=${topic.id}`}
                      className="tooltip"
                    >
                      {topic.title}
                    </Link>
                  </strong>
                </span>
                <span style={{ float: 'right' }} className="last_poster">
                  by <Link to={`/user/${topic.author.id}`}>{topic.author.name}</Link>
                  <span className="time tooltip">{topic.lastPostTime}</span>
                </span>
              </td>
              <td className="td_replies number_column m_td_right">{topic.numReplies}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="linkbox pager">{/* Add pager links here */}</div>
      <div className="linkbox">
        <Link to={`/forums/catchup/forum/${forumData.id}`} className="brackets">
          Catch up
        </Link>
      </div>
    </div>
  );
};

export default ForumPage;