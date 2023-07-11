import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForumById } from "../../../hooks/useForumById";
import "./Forum.css";
import ForumPageTopicInfo from "./ForumPageTopicInfo";
import ForumHeader from "./ForumHeader";
import ErrorBoundary from "../../layout/ErrorBoundary";
import FallbackComponent from "../../layout/FallbackComponent";
const logErrorToService = async (error, info) => {
  const errorData = {
    timestamp: new Date().toISOString(),
    errorType: error.name,
    errorMessage: error.message,
    stackTrace: error.stack,
    additionalInfo: info,
  };
  console.log(error, info);
  console.log(
    errorData +
      "localized error data[ForumPage], start this todo (implement logstash or similar)"
  );
};

const ForumPage = () => {
  const { forumId } = useParams();
  const { data: forumsById, isLoading, errorMessage } = useForumById(forumId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }

  if (!forumsById) {
    return <div>Forum not found</div>;
  }

  return (
    <div className="thin">
      <div>
        <ForumHeader forum={forumsById} />
      </div>
      <div class="forum_index m_table">
        <div class="forumRow colhead forumHeader">
          <div class="forumCell forumStatus"></div>
          <div class="forumCell forumLatest">Latest</div>
          <div class="forumCell forumReplies">Replies</div>
          <div class="forumCell forumAuthor">Author</div>
        </div>
        {forumsById.forumTopics && forumsById.forumTopics.length > 0 ? (
          forumsById.forumTopics.map(
            (topic) =>
              topic.author && (
                <ErrorBoundary
                  FallbackComponent={FallbackComponent}
                  onError={logErrorToService}
                  onReset={() => {
                    // TODO reset state so it doesn't happen again
                  }}
                >
                  {" "}
                  <ForumPageTopicInfo
                    key={topic._id}
                    forumId={forumsById._id}
                    topic={topic}
                  />
                </ErrorBoundary>
              )
          )
        ) : (
          <tr>
            <td colSpan="4">No threads to display in this forum!</td>
          </tr>
        )}
      </div>

      <div className="linkbox pager">{/* Add pager links here */}</div>
      <div className="linkbox">
        <Link
          to={`/private/forums/catchup/${forumsById._id}`}
          className="brackets"
        >
          Catch up
        </Link>
      </div>
    </div>
  );
};

export default ForumPage;
