import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "../../../actions/user";
import useUserDataById from "../../../hooks/useUserDataById";
import Time from "../../layout/Time";

const ForumPageTopicInfo = ({ topic }) => {
  console.log(topic.author);
  const {
    user: author,
    isLoading: loadingUsers,
    errorMessage: error,
  } = useUserDataById(topic.author);

  const lastPostTime = topic.forumPosts.reduce((latest, post) => {
    return new Date(post.createdAt) > new Date(latest)
      ? post.createdAt
      : latest;
  }, new Date(0));

  if (loadingUsers) {
    return <div>Loading author...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="forumRow">
      <div className="forumCell forumStatus"></div>
      <div className="forumCell forumLatest">
        <span className="last_topic">
          <strong>
            <Link
              to={`/private/forums/${topic.forum}/topics/${topic._id}`}
              className="tooltip"
            >
              {topic.title}
            </Link>
          </strong>
        </span>
        <span className="last_poster">
          by{" "}
          {author ? (
            <Link to={`/private/user/${author._id}`}>{author.username}</Link>
          ) : (
            "Unkown author"
          )}
          <Time timestamp={lastPostTime} />
        </span>
      </div>
      <div className="forumCell forumReplies">{topic.numPosts}</div>
      <div className="forumCell forumAuthor">
        {author ? (
          <Link to={`/private/user/${author._id}`}>{author.username}</Link>
        ) : (
          "Unkown author"
        )}
      </div>
    </div>
  );
};

export default ForumPageTopicInfo;
