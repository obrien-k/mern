import React from "react";
import { Link } from "react-router-dom";
import useUserDataById from "../../../hooks/useUserDataById";
import useForumPostsByTopicId from "../../../hooks/useForumPostsByTopicId";
import Time from "../../layout/Time";

const ForumCategoryForumInfo = ({ forum }) => {
  console.log(topic.author);

  const {
    user: author,
    isLoading: loadingUsers,
    errorMessage: error,
  } = useUserDataById(forum.author); //left off here, don't have forum author or recent topics

  const { forumPosts, loading } = useForumPostsByTopicId(
    topic.forum,
    topic._id
  );

  if (loadingUsers) {
    return <div>Loading author...</div>;
  }

  if (loading) {
    return <div>Loading posts...</div>;
  }

  const lastPostTime = forumPosts.reduce((latest, post) => {
    return new Date(post.createdAt) > new Date(latest)
      ? post.createdAt
      : latest;
  }, new Date(0));

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(lastPostTime);
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

export default ForumCategoryForumInfo;
