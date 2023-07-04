import React, { useState } from "react";
import DoNotContributeList from "./DoNotContributeList";

const ContributeForm = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the /api/communities endpoint here
    // ...
  };

  return (
    <div id="content">
      <div className="box pad" style={{ margin: "0px auto", width: "700px" }}>
        <DoNotContributeList />
      </div>
      <div className="thin">
        <p style={{ textAlign: "center" }}>
          Your personal announce URL is:
          <br />
          <input
            type="text"
            value="https://localhost:34000/86519d75682397913039534ea21a4e45/announce"
            size="71"
            onClick={(e) => e.target.select()}
            readOnly
          />
        </p>
        <form
          className="create_form"
          name="community"
          action=""
          enctype="multipart/form-data"
          method="post"
          id="upload_table"
          onSubmit={handleSubmit}
        >
          <div>
            <input type="hidden" name="submit" value="true" />
            <input type="hidden" name="auth" value="49bfca1e8f1be12d93dde136ec364d0f" />
          </div>
          <table
            cellpadding="3"
            cellspacing="1"
            border="0"
            className="layout border"
            width="100%"
          >
            <tbody>
              {/* Rest of the form goes here */}
              <tr>
                <td className="label">Title:</td>
                <td>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    size="60"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Tags:</td>
                <td>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    size="60"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Image (optional):</td>
                <td>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    size="60"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Description:</td>
                <td>
                  <textarea
                    name="desc"
                    id="desc"
                    cols="60"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </td>
              </tr>
              {/* Add other form elements */}
            </tbody>
          </table>
          <div id="dynamic_form">
            {/* Other dynamic form elements can go here */}
          </div>
          <table
            cellpadding="3"
            cellspacing="1"
            border="0"
            className="layout border slice"
            width="100%"
          >
            <tbody>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {/* Rest of the content */}
                  <input id="post" type="submit" value="Contribute community" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ContributeForm;
