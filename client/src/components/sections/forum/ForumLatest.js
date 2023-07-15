import { Link } from "react-router-dom";
import Time from "../../layout/Time";
import AuthorLink from "./AuthorLink";

const ForumLatest = ({ forum, lastTopic, lastPost }) => {
  if (!lastTopic) {
    return (
      <span>
        There are no topics here.{" "}
        <Link to={`/private/forums/${forum._id}/new`}>Create one!</Link>
      </span>
    );
  }
  console.log(lastTopic);
  console.log(lastPost + "ForumLatest.js");
  return (
    <>
      <span style={{ float: "left" }} className="last_topic">
        <strong>
          <Link
            to={`/private/forums/${forum._id}/topics/${lastTopic._id}`}
            className="tooltip"
          >
            {lastTopic.title}
          </Link>
        </strong>
      </span>
      <span style={{ float: "right" }} className="last_poster">
        by <AuthorLink userId={lastPost?.author} />
        <Time timestamp={lastPost?.timestamp} />
      </span>
    </>
  );
};

export default ForumLatest;
