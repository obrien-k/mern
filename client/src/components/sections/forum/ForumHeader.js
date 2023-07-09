import { Link } from "react-router-dom";

const ForumHeader = ({ forum, forumTopic }) => {
  const isForumTopic = forumTopic && Object.keys(forumTopic).length > 0;

  const forumName = isForumTopic ? (
    <Link to={`/private/forums/${forum._id}`}>{forum.name}</Link>
  ) : (
    forum.name
  );

  return (
    <div>
      <h2>
        <Link to="/private/forums">Forums</Link> &gt; {forumName}
        {isForumTopic && ` > ${forumTopic.title}`}
      </h2>
      <div className="linkbox">
        <div className="center">
          {isForumTopic ? (
            <>
              <Link
                to={`/private/forums/${forum._id}/topics/${forumTopic._id}/report`}
                className="brackets"
              >
                Report thread
              </Link>
              <Link to="#" className="brackets">
                Search this thread
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/private/forums/${forum._id}/new`}
                className="brackets"
              >
                New thread
              </Link>
              <Link
                to={`/private/forums/${forum._id}/search`}
                className="brackets"
              >
                Search this forum
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumHeader;
