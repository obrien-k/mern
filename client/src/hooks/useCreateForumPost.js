import { useDispatch } from "react-redux";
import { createForumPost } from "../actions/forum"; // import action

const useCreateForumPost = () => {
  const dispatch = useDispatch();
  const createPost = (forumId, forumTopicId, body, userId) => {
    console.log(
      forumId,
      forumTopicId,
      body,
      userId + "from useCreateForumPost"
    );
    dispatch(createForumPost(forumId, forumTopicId, body, userId));
  };
  return createPost;
};

export default useCreateForumPost;
