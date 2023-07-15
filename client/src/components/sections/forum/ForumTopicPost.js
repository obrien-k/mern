import React from "react";
import { Link } from "react-router-dom";
import useUserById from "../../../hooks/useUserById";
import Time from "../../layout/Time";
import Spinner from "../../layout/Spinner";

const ForumTopicPost = ({ post, forumId, forumTopicId }) => {
  const { _id: id, author: authorId, body, createdAt } = post;
  console.log(JSON.stringify(post));
  const {
    user: author,
    isLoading: loadingUsers,
    errorMessage: error,
  } = useUserById(authorId);

  if (loadingUsers) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error loading author with ID {authorId}: {error}
      </div>
    );
  }

  console.log(post + "ForumTopicPost.js");
  console.log(author);
  return (
    <div className="forum_post" id={`post${id}`}>
      <table className="forum_post wrap_overflow box vertical_margin">
        <tbody>
          <tr className="colhead_dark">
            <td colSpan="2">
              <div style={{ float: "left" }}>
                <Link
                  className="post_id"
                  to={`/private/forums/${forumId}/topics/${forumTopicId}/posts#${id}`}
                >
                  #{post._id}
                </Link>
                <strong>
                  <Link to={`/private/users/${authorId}`}>
                    {author?.username}
                  </Link>
                </strong>
                {author?.isDonor ? (
                  <Link target="_blank" to="/private/donate">
                    <img
                      className="donor_icon tooltip"
                      src="static/common/symbols/donor_6.png"
                      alt="Donor"
                    />
                  </Link>
                ) : null}
                <strong>({author?.userRole})</strong>
                <Time timestamp={createdAt} /> -{" "}
                <Link to="#quickpost" className="brackets">
                  Quote
                </Link>{" "}
              </div>
              <div id={`bar${post._id}`} style={{ float: "right" }}>
                <Link
                  to={`reports.php?action=report&type=post&id=${post._id}`}
                  className="brackets"
                >
                  Report
                </Link>{" "}
                &nbsp;
                <Link to="#">↑</Link>
              </div>
            </td>
          </tr>
          <tr>
            <td className="avatar" valign="top">
              <div className="avatar_container">
                <div>
                  <img
                    className="avatar_0"
                    src={author?.avatar}
                    alt={`${author?.username}'s avatar`}
                    width="150"
                  />
                </div>
              </div>
            </td>
            <td className="body" valign="top">
              <div
                className="post_content"
                dangerouslySetInnerHTML={{ __html: body }}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ForumTopicPost;
