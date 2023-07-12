import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCreateForumTopic } from "../../../hooks/useCreateForumTopic";

const NewTopicForm = () => {
  const { forumId } = useParams();
  const { submitTopic } = useCreateForumTopic();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [preview, setPreview] = useState(false);
  const [showPollQuestion, setShowPollQuestion] = useState(false);
  const [showPollAnswers, setShowPollAnswers] = useState(false);

  const handleAddAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const handleRemoveAnswer = () => {
    const newAnswers = [...answers];
    newAnswers.pop();
    setAnswers(newAnswers);
  };

  const handleAnswerChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitTopic(
      title,
      forumId,
      body,
      question,
      answers.filter((answer) => answer.trim() !== "")
    );
  };

  return (
    <div id="content">
      <div className="thin">
        <h2>
          <Link to="/private/forums">Forums</Link> &gt;{" "}
          <Link to={`/private/forums/${forumId}`}>todo: Forum.name</Link> &gt;{" "}
          <span>New Topic</span>
        </h2>

        {preview && (
          <div className="box thin clear hidden">
            {/* Preview content goes here */}
          </div>
        )}

        <div className="box pad">
          <form className="create_form" onSubmit={handleSubmit}>
            <table className="layout">
              <tbody>
                <tr>
                  <td className="label">Title:</td>
                  <td>
                    <input
                      type="text"
                      name="title"
                      style={{ width: "98%" }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Body:</td>
                  <td>
                    <textarea
                      name="body"
                      style={{ width: "98%" }}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      required
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="center">
                    <strong>Poll Settings</strong>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPollQuestion(!showPollQuestion);
                        setShowPollAnswers(!showPollAnswers);
                      }}
                      className="brackets"
                    >
                      View
                    </a>
                  </td>
                </tr>
                {showPollQuestion && (
                  <tr>
                    <td className="label">Poll Question:</td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "98%" }}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </td>
                  </tr>
                )}
                {showPollAnswers && (
                  <tr>
                    <td className="label">Poll Answers:</td>
                    <td>
                      {answers.map((answer, index) => (
                        <div key={index}>
                          <input
                            type="text"
                            style={{ width: "90%" }}
                            value={answer}
                            onChange={(e) => handleAnswerChange(e, index)}
                          />
                        </div>
                      ))}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddAnswer();
                        }}
                        className="brackets"
                      >
                        +
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveAnswer();
                        }}
                        className="brackets"
                      >
                        −
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="center">
              <input
                type="button"
                value="Preview"
                onClick={() => setPreview(true)}
              />
              <input type="submit" value="Create thread" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTopicForm;
