import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllForums,
  getAllForumTopics,
  getAllForumCategories,
} from "../actions/forum";

const useAllForumsData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forumsFetched, setForumsFetched] = useState(false);
  const [forumsWithTopics, setForumsWithTopics] = useState([]);

  const forums = useSelector((state) => state.forum.forums);
  const forumCategories = useSelector((state) => state.forum.forumCategories);
  const forumTopics = useSelector((state) => state.forum.forumTopics);

  useEffect(() => {
    console.log("useAllForumsData: Fetching forums");
    dispatch(getAllForums());
    dispatch(getAllForumCategories());
  }, [dispatch]);

  useEffect(() => {
    if (forums && forums.length > 0) {
      console.log("useAllForumsData: Forums fetched");
      setForumsFetched(true);
      console.log("useAllForumsData: Fetching forums" + JSON.stringify(forums));
    }
  }, [forums]);

  useEffect(() => {
    const fetchForumTopics = async () => {
      if (!forumsFetched) {
        console.log("useAllForumsData: Waiting for forums to be fetched");
        return;
      }

      console.log("useAllForumsData: Fetching forum topics");
      const topicPromises = forums.map(async (forum) => {
        if (forum.forumTopics) {
          await dispatch(getAllForumTopics(forum._id));
        }
      });

      await Promise.all(topicPromises);

      setLoading(false);
    };

    fetchForumTopics();
  }, [forums, forumsFetched, dispatch]);

  useEffect(() => {
    if (forumTopics.length > 0 && forums.length > 0) {
      console.log(forumTopics);
      console.log("useAllForumsData: Combining forums and topics");
      const mapTopicsToForum = forums.map((forum) => {
        const topic = forumTopics.filter((topic) => topic.forum == forum._id);
        return {
          ...forum,
          mostRecentTopic: topic[0],
        };
      });

      setForumsWithTopics(mapTopicsToForum);
      setLoading(false);
    }
  }, [forumTopics, forums]);

  return {
    loading,
    error,
    forums: forumsWithTopics.length > 0 ? forumsWithTopics : [],
    forumCategories,
  };
};

export default useAllForumsData;
