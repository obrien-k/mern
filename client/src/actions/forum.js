import {
  GET_ALL_FORUMS,
  GET_FORUM_BY_ID,
  GET_FORUM_BY_ID_ERROR,
  GET_FORUM_IDS,
  GET_FORUM_IDS_ERROR,
  CREATE_FORUM,
  GET_ALL_FORUM_CATEGORIES,
  GET_FORUM_CATEGORY_BY_ID,
  GET_FORUM_CATEGORY_BY_ID_ERROR,
  GET_FORUM_CATEGORY_IDS,
  GET_FORUM_CATEGORY_IDS_ERROR,
  CREATE_FORUM_CATEGORY,
  UPDATE_FORUM_CATEGORY,
  DELETE_FORUM_CATEGORY,
  CREATE_FORUM_TOPIC,
  GET_ALL_FORUM_TOPICS,
  GET_FORUM_TOPIC_BY_ID,
  GET_FORUM_TOPIC_IDS,
  UPDATE_FORUM_TOPIC,
  DELETE_FORUM_TOPIC,
  CREATE_FORUM_POST,
  GET_ALL_FORUM_POSTS,
  GET_FORUM_POST_BY_ID,
  GET_FORUM_POSTS_BY_TOPIC_ID,
  DELETE_FORUM_POST,
  FORUM_ERROR,
  LOADING_FORUMS,
  LOADING_CATEGORIES,
  LOADING_TOPICS,
  LOADING_POSTS,
} from "./types";
import api from "../utils/api";

export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

// Forums
export const getAllForums = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_FORUMS });

    const res = await api.get("/forums");
    dispatch({
      type: GET_ALL_FORUMS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

export const getForumIds = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_FORUMS });

    const res = await api.get(`/forums/ids`);
    console.log("Response from the server:", res);
    dispatch({
      type: GET_FORUM_IDS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: GET_FORUM_IDS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

export const getForumById = (id) => async (dispatch) => {
  dispatch({ type: LOADING_FORUMS });
  try {
    const res = await api.get(`/forums/${id}`);
    console.log("Response from the server:", res);
    dispatch({
      type: GET_FORUM_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: GET_FORUM_BY_ID_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

export const createForum =
  (
    forumCategory,
    sort,
    name,
    description,
    minClassRead,
    minClassWrite,
    minClassCreate,
    autoLock,
    autoLockWeeks
  ) =>
  async (dispatch) => {
    try {
      const res = await api.post("/forums", {
        forumCategory,
        sort,
        name,
        description,
        minClassRead,
        minClassWrite,
        minClassCreate,
        autoLock,
        autoLockWeeks,
      });

      dispatch({
        type: CREATE_FORUM,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: FORUM_ERROR,
        payload: {
          msg: error?.response?.statusText,
          status: error?.response?.status,
        },
      });
    }
  };

// Forum Categories
export const getAllForumCategories = () => async (dispatch) => {
  dispatch({ type: LOADING_CATEGORIES });
  try {
    const res = await api.get("/forums/categories");
    dispatch({
      type: GET_ALL_FORUM_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

export const getForumCategoryIds =
  () =>
  async (dispatch, getState, { getForumCategoryById }) => {
    dispatch({ type: LOADING_CATEGORIES });
    try {
      const res = await api.get(`/forums/categories/ids`);
      dispatch({
        type: GET_FORUM_CATEGORY_IDS,
        payload: res.data,
      });
      res.data.forEach((id) => dispatch(getForumCategoryById(id)));
    } catch (error) {
      console.log("Error in action creator:", error);
      const errorResponse = error.response || {};
      dispatch({
        type: GET_FORUM_CATEGORY_IDS_ERROR,
        payload: {
          msg: errorResponse.statusText || "Error message not available",
          status: errorResponse.status || "Status code not available",
          error: error.toString(),
        },
      });
    }
  };

export const getForumCategoryById = (id) => async (dispatch) => {
  dispatch({ type: LOADING_CATEGORIES });
  try {
    const res = await api.get(`/forums/categories/${id}`);
    dispatch({
      type: GET_FORUM_CATEGORY_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: GET_FORUM_CATEGORY_BY_ID_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

export const createForumCategory = (sort, name) => async (dispatch) => {
  try {
    const res = await api.post("/forums/categories", { sort, name });
    dispatch({
      type: CREATE_FORUM_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

export const updateForumCategory = (id, categoryData) => async (dispatch) => {
  try {
    const res = await api.put(`/forums/categories/${id}`, categoryData);
    dispatch({
      type: UPDATE_FORUM_CATEGORY,
      payload: { id, ...res.data },
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

export const deleteForumCategory = (id) => async (dispatch) => {
  try {
    await api.delete(`/forums/categories/${id}`);
    dispatch({
      type: DELETE_FORUM_CATEGORY,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

// Forum topics

export const createForumTopic =
  (title, forumId, body, question, answers) => async (dispatch) => {
    try {
      const res = await api.post(`/forums/${forumId}/topics`, {
        title,
        forumId,
        body,
        question,
        answers,
      });
      dispatch({
        type: CREATE_FORUM_TOPIC,
        payload: {
          forumId,
          topic: res.data,
        },
      });
    } catch (error) {
      dispatch({
        type: FORUM_ERROR,
        payload: {
          msg: error?.response?.statusText,
          status: error?.response?.status,
        },
      });
    }
  };

export const getAllForumTopics = (forumId) => async (dispatch) => {
  dispatch({ type: LOADING_TOPICS });
  try {
    const res = await api.get(`/forums/${forumId}/topics`);
    const forumTopics = res.data || [];
    dispatch({
      type: GET_ALL_FORUM_TOPICS,
      payload: { forumId, forumTopics },
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

export const getForumTopicById =
  (forumId, forumTopicId) => async (dispatch) => {
    dispatch({ type: LOADING_TOPICS });
    try {
      const res = await api.get(`/forums/${forumId}/topics/${forumTopicId}`);
      dispatch({
        type: GET_FORUM_TOPIC_BY_ID,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error in action creator:", error);
      const errorResponse = error.response || {};
      dispatch({
        type: FORUM_ERROR,
        payload: {
          msg: errorResponse.statusText || "Error message not available",
          status: errorResponse.status || "Status code not available",
          error: error.toString(),
        },
      });
    }
  };

export const getForumTopicIds = (forumId) => async (dispatch) => {
  dispatch({ type: LOADING_TOPICS });
  try {
    const res = await api.get(`/forums/${forumId}/topics/`);
    dispatch({
      type: GET_FORUM_TOPIC_IDS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

export const updateForumTopic = (forumId, id, title) => async (dispatch) => {
  try {
    const res = await api.put(`/forums/${forumId}topics/${id}`, { title });
    dispatch({
      type: UPDATE_FORUM_TOPIC,
      payload: { id, ...res.data },
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

export const deleteForumTopic = (forumId, id) => async (dispatch) => {
  try {
    await api.delete(`/forums/${forumId}/topics/${id}`);
    dispatch({
      type: DELETE_FORUM_TOPIC,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

//Forum posts

export const createForumPost =
  (forumId, forumTopicId, body, userId) => async (dispatch) => {
    try {
      const url = `/forums/${forumId}/topics/${forumTopicId}/posts`;
      const res = await api.post(url, { body, userId });

      dispatch({
        type: CREATE_FORUM_POST,
        payload: {
          post: res.data,
          forumTopicId,
        },
      });
    } catch (error) {
      dispatch({
        type: FORUM_ERROR,
        payload: {
          msg: error?.response?.statusText,
          status: error?.response?.status,
        },
      });
    }
  };

export const getAllForumPosts = (forumId) => async (dispatch) => {
  dispatch({ type: LOADING_POSTS });
  try {
    const res = await api.get(`/forums/${forumId}posts`);
    dispatch({
      type: GET_ALL_FORUM_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

export const getForumPostsByTopicId =
  (forumId, forumTopicId) => async (dispatch) => {
    dispatch({ type: LOADING_POSTS });
    try {
      const res = await api.get(
        `/forums/${forumId}/topics/${forumTopicId}/posts`
      );
      dispatch({
        type: GET_FORUM_POSTS_BY_TOPIC_ID,
        forumTopicId,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error in action creator:", error);
      const errorResponse = error.response || {};
      dispatch({
        type: FORUM_ERROR,
        payload: {
          msg: errorResponse.statusText || "Error message not available",
          status: errorResponse.status || "Status code not available",
          error: error.toString(),
        },
      });
    }
  };

export const getForumPostById =
  (forumId, forumTopicId, forumPostId) => async (dispatch) => {
    dispatch({ type: LOADING_POSTS });
    try {
      const res = await api.get(
        `/forums/${forumId}/topics/${forumTopicId}/posts/${forumPostId}`
      );
      dispatch({
        type: GET_FORUM_POST_BY_ID,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error in action creator:", error);
      const errorResponse = error.response || {};
      dispatch({
        type: FORUM_ERROR,
        payload: {
          msg: errorResponse.statusText || "Error message not available",
          status: errorResponse.status || "Status code not available",
          error: error.toString(), // Adding the full error as a string.
        },
      });
    }
  };

export const deleteForumPost = (id) => async (dispatch) => {
  try {
    await api.delete(`/forums/posts/${id}`);
    dispatch({
      type: DELETE_FORUM_POST,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};
