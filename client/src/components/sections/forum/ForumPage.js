import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForumDataById } from "../../../hooks/useForumDataById";
import "./Forum.css";
import ForumPageTopicInfo from "./ForumPageTopicInfo";
import ForumHeader from "./ForumHeader";
import { useForumTopicDataById } from "../../../hooks/useForumTopicDataById";

const ForumPage = () => {
  const { forumId } = useParams();
  const { data: forum, isLoading, errorMessage } = useForumDataById(forumId);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const selectedTopic = forum?.forumTopics?.find(
    (topic) => topic._id === selectedTopicId
  );

  const handleReport = () => {
    // TODO report functionality
  };

  const handleSearchToggle = () => {
    // TODO search toggle functionality
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // TODO search submit functionality
  };

  const [searchQuery, setSearchQuery] = useState("todo");
  const [searchUser, setSearchUser] = useState("todo");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }

  if (!forum) {
    return <div>Forum not found</div>;
  }

  const handleTopicSelect = (topicId) => {
    setSelectedTopicId(topicId);
  };

  return (
    <div className="thin">
      <div>
        <ForumHeader
          forum={forum}
          forumTopic={selectedTopic}
          handleReport={handleReport}
          handleSearchToggle={handleSearchToggle}
          handleSearchSubmit={handleSearchSubmit}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchUser={searchUser}
          setSearchUser={setSearchUser}
        />
      </div>
      <div class="forum_index m_table">
        <div class="forumRow colhead forumHeader">
          <div class="forumCell forumStatus"></div>
          <div class="forumCell forumLatest">Latest</div>
          <div class="forumCell forumReplies">Replies</div>
          <div class="forumCell forumAuthor">Author</div>
        </div>
        {forum.forumTopics && forum.forumTopics.length > 0 ? (
          forum.forumTopics.map(
            (topic) =>
              topic.author && (
                <ForumPageTopicInfo key={topic._id} topic={topic} />
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
        <Link to={`/private/forums/catchup/${forum._id}`} className="brackets">
          Catch up
        </Link>
      </div>
    </div>
  );
};

export default ForumPage;
