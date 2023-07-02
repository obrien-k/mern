import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForumDataById } from '../../../hooks/useForumDataById'; // Using the new hook here
import './ForumList.css';
import NewTopicForm from './NewTopicForm';

const ForumPage = () => {
  const { forumId } = useParams();

  const { data: forumData, isLoading, errorMessage } = useForumDataById(forumId); // Using the new hook here

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!forumData) {
    return <div>Forum not found</div>;
  }

  return (
    <div className="thin">
      <h2>
        <Link to="/forums">Forums</Link> &gt; {forumData.name}
      </h2>
      <div className="linkbox">
        <Link to={`/forums/${forumData.id}/new-topic`} className="brackets">
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
          {forumData.topics && forumData.topics.map((topic) => (
            <tr key={topic.id} className="rowb">
              <td className="td_read read tooltip"></td>
              <td className="td_latest">
                <span className="last_topic">
                  <strong>
                    <Link
                      to={`/forums/${forumData.id}/${topic.id}`}
                      className="tooltip"
                    >
                      {topic.title}
                    </Link>
                  </strong>
                </span>
                <span className="last_poster">
                  by <Link to={`/user/${topic.authorId}`}>{topic.author}</Link>{' '}
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
        <Link
          to={`/forums/catchup/${forumData.id}`}
          className="brackets"
        >
          Catch up
        </Link>
      </div>
    </div>
  );
};

export default ForumPage;
