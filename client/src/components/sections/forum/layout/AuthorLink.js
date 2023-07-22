import useUserById from "../../../../hooks/useUserById";
import { Link } from "react-router-dom";

const AuthorLink = ({ userId }) => {
  const { user: author, isLoading, errorMessage } = useUserById(userId);

  if (isLoading) {
    return <div>Loading author...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!author) {
    return <span>Unknown author</span>;
  }

  return <Link to={`/private/user/${author?._id}`}>{author?.username}</Link>;
};

export default AuthorLink;
