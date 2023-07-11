import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCreateForumPost from "../../hooks/useCreateForumPost";

const PostBox = ({ forumId, forumTopicId, userId }) => {
  const [body, setBody] = useState("");
  console.log(forumId, forumTopicId + "PostBox forumId forumTopicId");
  const createPost = useCreateForumPost();

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost(forumId, forumTopicId, body, userId);
  };

  return (
    <div id="reply_box">
      <h3>Post reply</h3>
      <div className="box pad">
        <div
          className="forumContainer forum_post box vertical_margin preview_wrap"
          id="preview_wrap_0"
        >
          <div className="forumPreview hidden">
            <div className="forumBody">
              <div className="colhead_dark">
                <div className="forumRow">
                  <div style={{ float: "left" }}>
                    <Link to="#quickreplypreview">#XXXXXX</Link> by
                    <strong>
                      <Link to="/private/user">admin</Link>
                    </strong>
                    <Link to="/private/donate">
                      <img
                        className="donor_icon tooltip"
                        src="static/common/symbols/donor_6.png"
                        alt="Donor"
                      />
                    </Link>{" "}
                    (Sysop) Just now
                  </div>
                  <div style={{ float: "right" }}>
                    <Link to="#quickreplypreview" className="brackets">
                      Report
                    </Link>{" "}
                    &nbsp;
                    <Link to="#">↑</Link>
                  </div>
                </div>
              </div>
              <div className="forumRow">
                <div className="forumCell forumAvatar">
                  <div className="avatar">
                    <div className="avatar_container">
                      <div>
                        <img
                          width="150"
                          alt="admin's avatar"
                          className="avatar_0"
                          src="static/common/avatars/default.png"
                        />
                      </div>
                    </div>
                    <div className="forumCell">
                      <div id="contentpreview" style={{ textAlign: "left" }}>
                        <div
                          id="preview_0"
                          className="text_preview tooltip"
                          title="Double-click to edit"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="forumBody">
            <form
              className="send_form center"
              name="reply"
              id="quickpostform"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="action" value="reply" />
              <input
                type="hidden"
                name="auth"
                value="0e8326b1f67584bc62867697f019ea6e"
              />
              <input type="hidden" name="thread" value="2" />
              <div id="quickreplytext">
                <div id="textarea_wrap_0" className="field_div textarea_wrap">
                  <textarea
                    name="body"
                    id="quickpost"
                    cols="90"
                    rows="8"
                    tabIndex="1"
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                  ></textarea>
                </div>
                <br />
              </div>
              <div className="preview_submit">
                <input
                  id="subscribebox"
                  type="checkbox"
                  name="subscribe"
                  tabIndex="2"
                />
                <label htmlFor="subscribebox">Subscribe</label>
                <input
                  id="mergebox"
                  type="checkbox"
                  name="merge"
                  tabIndex="2"
                />
                <label htmlFor="mergebox">Merge</label>
                <input
                  type="button"
                  value="Preview"
                  className="button_preview_0"
                  tabIndex="1"
                />
                <input
                  type="submit"
                  value="Post reply"
                  id="submit_button"
                  tabIndex="1"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostBox;
