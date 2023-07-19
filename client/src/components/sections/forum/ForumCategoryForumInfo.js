import React from "react";
import { Link } from "react-router-dom";
import ForumCell from "./ForumCell";
import ForumLatest from "./ForumLatest";

const ForumCategoryForumInfo = ({ forum }) => {
  return (
    <div className="forumRow">
      <ForumCell className="forumStatus"></ForumCell>
      <ForumCell className="forumName">
        <h4>
          <Link to={`/private/forums/${forum._id}`}>{forum.name}</Link>
        </h4>
      </ForumCell>
      <ForumCell className="forumLatest">
        {forum.lastTopic && forum.lastPost ? (
          <ForumLatest
            forum={forum}
            lastTopic={forum.lastTopic}
            lastPost={forum.lastPost}
          />
        ) : (
          <ForumLatest className="forumLatest" forum={forum} />
        )}
      </ForumCell>
      <ForumCell className="forumTopics">
        {forum.numTopics ? forum.numTopics : 0}
      </ForumCell>
      <ForumCell className="forumPosts">
        {forum.numPosts ? forum.numPosts : 0}
      </ForumCell>
    </div>
  );
};

export default ForumCategoryForumInfo;
