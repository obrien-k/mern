import React from "react";
import { Link } from "react-router-dom";
import useUserById from "../../../hooks/useUserById";
import Time from "../../layout/Time";

const ForumCategoryForumInfo = ({ forum }) => {
  console.log(forum.mostRecentTopic?.author);
  console.log(forum.mostRecentTopic);
  console.log(forum);
  const {
    user: author,
    isLoading: loadingUsers,
    errorMessage: error,
  } = useUserById(forum.mostRecentTopic?.author);

  if (loadingUsers) {
    return <div>Loading author...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const lastPostTime = forum.mostRecentTopic?.timestamp;

  return (
    <div className="forumRow">
      <div className="forumCell forumStatus"></div>
      <div className="forumCell forumName">
        <h4>
          <Link to={`/private/forums/${forum._id}`}>{forum.name}</Link>
        </h4>
      </div>
      <div className="forumCell forumLatest">
        {forum.mostRecentTopic ? (
          <>
            <span style={{ float: "left" }} className="last_topic">
              <strong>
                <Link
                  to={`/private/forums/${forum._id}/topics/${forum.mostRecentTopic._id}`}
                  className="tooltip"
                >
                  {forum.mostRecentTopic.title}
                </Link>
              </strong>
            </span>
            <span style={{ float: "right" }} className="last_poster">
              by{" "}
              {author ? (
                <Link to={`/private/user/${author._id}`}>
                  {author.username}
                </Link>
              ) : (
                "Unkown author"
              )}
              <Time timestamp={lastPostTime} />
            </span>
          </>
        ) : (
          <span>
            There are no topics here.{" "}
            <Link to={`/private/forums/${forum._id}/new`}>Create one!</Link>
          </span>
        )}
      </div>
      <div className="forumCell forumTopics">
        {forum.numTopics ? forum.numTopics : 0}
      </div>
      <div className="forumCell forumPosts">
        {forum.numPosts ? forum.numPosts : 0}
      </div>
    </div>
  );
};

export default ForumCategoryForumInfo;