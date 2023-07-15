import React from "react";
import { Link } from "react-router-dom";
import useUserById from "../../../hooks/useUserById";
import useForumPostsByTopicId from "../../../hooks/useForumPostsByTopicId";
import Time from "../../layout/Time";

const ForumPageTopicInfo = ({ forumId, topic }) => {
  console.log(topic.author);

  const {
    user: author,
    isLoading: loadingUsers,
    errorMessage: error,
  } = useUserById(topic.author);

  const { forumPosts, loading } = useForumPostsByTopicId(
    topic.forum,
    topic._id
  );

  if (loadingUsers || loading) {
    return <div>Loading...</div>;
  }

  let lastPostTime = new Date(0);

  if (forumPosts) {
    const postsArray = Object.values(forumPosts);
    lastPostTime = postsArray.reduce((latest, post) => {
      return new Date(post.createdAt) > new Date(latest)
        ? post.createdAt
        : latest;
    }, new Date(0));
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(lastPostTime);
  return (
    <div className="forumRow">
      {lastPostTime ? (
        <>
          <div className="forumCell forumStatus"></div>
          <div className="forumCell forumLatest">
            <span className="last_topic">
              <strong>
                <Link
                  to={`/private/forums/${forumId}/topics/${topic._id}`}
                  className="tooltip"
                >
                  {topic.title}
                </Link>
              </strong>
            </span>
            <span className="last_poster">
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
          </div>
          <div className="forumCell forumReplies">{topic.numPosts}</div>
          <div className="forumCell forumAuthor">
            {author ? (
              <Link to={`/private/user/${author._id}`}>{author.username}</Link>
            ) : (
              "Unkown author"
            )}
          </div>
        </>
      ) : (
        <div className="forumCell">
          <span>
            There are no topics here.{" "}
            <Link to={`/private/forums/${forumId}/new`}>Create one!</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default ForumPageTopicInfo;
