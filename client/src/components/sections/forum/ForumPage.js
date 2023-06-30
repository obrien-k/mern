import React from 'react';
import { useParams } from 'react-router-dom';
import './ForumList.css';

const ForumPage = () => {
  const { forumId } = useParams();

  // Fetch forum data and topics based on the forumId

  // Mock data for demonstration
  const forumData = {
    id: forumId,
    name: 'Announcements',
  };

  const topics = [
    {
      id: '1',
      title: 'tst',
      author: 'admin',
      lastPostTime: '2 days ago',
      numReplies: 0,
    },
    // Add more topics as needed
  ];

  return (
    <div className="thin">
      <h2>
        <a href="forums.php">Forums</a> &gt; {forumData.name}
      </h2>
      <div className="linkbox">
        <a href={`forums.php?action=new&amp;forumid=${forumData.id}`} className="brackets">
          New thread
        </a>
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
          {topics.map((topic) => (
            <tr key={topic.id} className="rowb">
              <td className="td_read read tooltip"></td>
              <td className="td_latest">
                <span style={{ float: 'left' }} className="last_topic">
                  <strong>
                    <a
                      href={`forums.php?action=viewthread&amp;threadid=${topic.id}`}
                      className="tooltip"
                      data-title-plain={topic.title}
                    >
                      {topic.title}
                    </a>
                  </strong>
                </span>
                <span style={{ float: 'left' }} className="tooltip last_read">
                  <a
                    href={`forums.php?action=viewthread&amp;threadid=${topic.id}&amp;page=1#post1`}
                  ></a>
                </span>
                <span style={{ float: 'right' }} className="last_poster">
                  by <a href={`user.php?id=1`}>{topic.author}</a>{' '}
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
        <a
          href={`forums.php?action=catchup&amp;forumid=${forumData.id}&amp;auth=49bfca1e8f1be12d93dde136ec364d0f`}
          className="brackets"
        >
          Catch up
        </a>
      </div>
    </div>
  );
};

export default ForumPage;
