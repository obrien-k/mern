import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ForumHeader from "./ForumHeader";
import PostBox from "../../layout/PostBox";
import forum from "../../../reducers/forum";
import { useForumTopicById } from "../../../hooks/useForumTopicById";
import { useForumById } from "../../../hooks/useForumById";

const ForumTopicPage = (props) => {
  const [forumPosts, setForumPosts] = useState([]);
  const { forumId, forumTopicId } = useParams();
  const userId = props.userId;
  const {
    data: forumTopic,
    isLoading,
    errorMessage,
  } = useForumTopicById(forumId, forumTopicId);
  const {
    data: forum,
    isLoading: forumIsLoading,
    errorMessage: forumErrorMessage,
  } = useForumById(forumId);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [isPollVisible, setPollVisible] = useState(false);
  const [isClosed, setClosed] = useState(false);
  const [isFeatured, setFeatured] = useState(false);
  const [isPollHidden, setPollHidden] = useState(false);
  const [isStickyPostVisible, setStickyPostVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/forums/${forumId}/topics/${forumTopicId}/posts`
        );
        setForumPosts(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [forumId, forumTopicId]);

  const handleReport = () => {
    // Handle report functionality
  };

  const handleSubscribe = () => {
    // Handle subscribe functionality
  };

  const handleSearchToggle = () => {
    const searchThreadElement = document.getElementById("searchthread");
    searchThreadElement.classList.toggle("hidden");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Handle search functionality
    console.log("Search Query:", searchQuery);
    console.log("Search User:", searchUser);
  };

  const handlePollToggle = () => {
    setPollVisible(!isPollVisible);
  };

  return (
    <div className="thin">
      <ForumHeader forum={forum} forumTopic={forumTopic} />
      <table className="layout border">
        <tbody>
          <tr>
            <td className="label">Move thread</td>
            <td>{/* Move thread options */}</td>
          </tr>
        </tbody>
      </table>
      {isPollVisible && (
        <div className="box thin clear">
          <div className="head colhead_dark">
            <strong>
              Poll{isClosed ? " [Closed]" : ""}{" "}
              {isFeatured && isFeatured !== "0000-00-00 00:00:00"
                ? " [Featured]"
                : ""}
            </strong>{" "}
            <a href="#" onClick={handlePollToggle} className="brackets">
              View
            </a>
          </div>
          <div
            className={`pad${isPollHidden ? " hidden" : ""}`}
            id="threadpoll"
          >
            {/* Poll content goes here */}
          </div>
        </div>
      )}
      {isStickyPostVisible && (
        <div className="box pad">{/* Sticky post content goes here */}</div>
      )}
      {forumPosts.map((post) => (
        <div className="forum_post" id={`post${post._id}`} key={post._id}>
          <table className="forum_post wrap_overflow box vertical_margin">
            <tbody>
              <tr className="colhead_dark">
                <td colSpan="2">
                  <div style={{ float: "left" }}>
                    <a
                      className="post_id"
                      href={`/private/forums/${forumId}/topics/${forumTopicId}/posts#${post._id}`}
                    >
                      #{post._id}
                    </a>
                    <strong>
                      <a href={`/private/users/${post.authorId}`}>
                        {post.author}
                      </a>
                    </strong>
                    <a target="_blank" href="donate.php">
                      <img
                        className="donor_icon tooltip"
                        src="static/common/symbols/donor_6.png"
                        alt="Donor"
                      />
                    </a>{" "}
                    <strong>(Sysop)</strong>
                    <span className="time tooltip">
                      {post.timestamp}
                    </span> -{" "}
                    <a href="#quickpost" className="brackets">
                      Quote
                    </a>
                  </div>
                  <div id={`bar${post._id}`} style={{ float: "right" }}>
                    <a
                      href={`reports.php?action=report&type=post&id=${post._id}`}
                      className="brackets"
                    >
                      Report
                    </a>{" "}
                    &nbsp;
                    <a href="#">↑</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="avatar" valign="top">
                  <div className="avatar_container">
                    <div>
                      <img
                        className="avatar_0"
                        src={post.avatar}
                        alt={`${post.author}'s avatar`}
                        width="150"
                      />
                    </div>
                  </div>
                </td>
                <td className="body" valign="top">
                  <div
                    className="post_content"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <div>
        <PostBox
          userId={userId}
          forumId={forumId}
          forumTopicId={forumTopicId}
        />
      </div>
    </div>
  );
};

export default ForumTopicPage;
