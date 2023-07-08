import { Link } from "react-router-dom";

// ForumHeader component
const ForumHeader = ({ forum, forumTopic }) => {
  const isForumTopic = forumTopic && Object.keys(forumTopic).length > 0;

  const forumName = isForumTopic ? (
    <Link to={`/private/forums/${forum._id}`}>{forum.name}</Link>
  ) : (
    forum.name
  );

  return (
    <h2>
      <Link to="/private/forums">Forums</Link> &gt; {forumName}
      {isForumTopic && ` > ${forumTopic.title}`}
    </h2>
  );
};

export default ForumHeader;
