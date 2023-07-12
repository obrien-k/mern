import React from "react";

const ForumTopic = ({ topic }) => {
  return (
    <td className="td_latest">
      <span style={{ float: "left" }} className="last_topic">
        <strong>
          <a
            href={`forums.php?action=viewthread&threadid=${topic.id}`}
            className="tooltip"
            data-title-plain={topic.title}
          >
            {topic.title}
          </a>
        </strong>
      </span>
      <span style={{ float: "left" }} className="tooltip last_read">
        <a
          href={`forums.php?action=viewthread&threadid=${topic.id}&page=1#post${topic.lastPostId}`}
        ></a>
      </span>
      <span style={{ float: "right" }} className="last_poster">
        by <a href={`user.php?id=${topic.authorId}`}>{topic.authorName}</a>{" "}
        <span className="time tooltip">{topic.time}</span>
      </span>
    </td>
  );
};

export default ForumTopic;
