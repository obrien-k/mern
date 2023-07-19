import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ForumHeader from "./ForumHeader";
import PostBox from "../../layout/PostBox";
import { useForumTopicById } from "../../../hooks/useForumTopicById";
import { useForumById } from "../../../hooks/useForumById";
import useForumPostsByTopicId from "../../../hooks/useForumPostsByTopicId";
import ForumTopicPost from "./ForumTopicPost";
import ErrorBoundary from "../../layout/ErrorBoundary";
import FallbackComponent from "../../layout/FallbackComponent";
import Spinner from "../../layout/Spinner";

const ForumTopicPage = () => {
  const { forumId, forumTopicId } = useParams();

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

  const { forumPosts, loading, error } = useForumPostsByTopicId(
    forumId,
    forumTopicId
  );

  console.log(JSON.stringify(forumTopic) + "ForumTopicPage line28");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [isPollVisible, setPollVisible] = useState(false);
  const [isClosed, setClosed] = useState(false);
  const [isFeatured, setFeatured] = useState(false);
  const [isPollHidden, setPollHidden] = useState(false);
  const [isStickyPostVisible, setStickyPostVisible] = useState(false);

  if (isLoading || forumIsLoading || loading) {
    return <Spinner />;
  }

  if (errorMessage || forumErrorMessage || error) {
    return (
      <div>
        Error: {JSON.stringify(errorMessage || forumErrorMessage || error)}
      </div>
    );
  }

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
      {isStickyPostVisible && <div className="box pad">Sticky content</div>}
      {forumPosts &&
        Object.values(forumPosts).map((post) => (
          <ErrorBoundary
            FallbackComponent={FallbackComponent}
            onError={console.log(
              "Error in ForumTopicPage.js ForumTopicPost component"
            )}
            onReset={() => {
              console.log("Resetting the error boundary by not");
            }}
          >
            <ForumTopicPost
              key={post._id}
              post={post}
              forumId={forumId}
              forumTopicId={forumTopicId}
            />
          </ErrorBoundary>
        ))}

      <div>
        <PostBox forumId={forumId} forumTopicId={forumTopicId} />
      </div>
    </div>
  );
};

export default ForumTopicPage;
