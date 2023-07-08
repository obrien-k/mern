import {
  GET_ALL_FORUMS,
  GET_FORUM_BY_ID,
  CREATE_FORUM,
  GET_ALL_FORUM_CATEGORIES,
  GET_FORUM_CATEGORY_BY_ID,
  CREATE_FORUM_CATEGORY,
  UPDATE_FORUM_CATEGORY,
  DELETE_FORUM_CATEGORY,
  FORUM_ERROR,
  CREATE_FORUM_POST,
  GET_ALL_FORUM_POSTS,
  GET_FORUM_POST_BY_ID,
  DELETE_FORUM_POST,
  CREATE_FORUM_TOPIC,
  GET_ALL_FORUM_TOPICS,
  GET_FORUM_TOPIC_BY_ID,
  UPDATE_FORUM_TOPIC,
  DELETE_FORUM_TOPIC,
  LOADING_FORUMS,
  LOADING_CATEGORIES,
} from "../actions/types";

const initialState = {
  forumPosts: [],
  forumTopics: [],
  forumPost: null,
  forumTopic: null,
  forums: [],
  forumCategories: [],
  loadingForums: true,
  loadingCategories: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_FORUMS:
      return {
        ...state,
        loadingForums: true,
      };

    case LOADING_CATEGORIES:
      return {
        ...state,
        loadingCategories: true,
      };

    case GET_ALL_FORUMS:
      return {
        ...state,
        forums: action.payload,
        loadingForums: false,
      };

    case GET_FORUM_BY_ID:
      return {
        ...state,
        forum: action.payload,
        loading: false,
      };

    case CREATE_FORUM:
      return {
        ...state,
        forums: [action.payload, ...state.forums],
        loading: false,
      };

    case GET_ALL_FORUM_CATEGORIES:
      return {
        ...state,
        forumCategories: action.payload,
        loadingCategories: false,
      };

    case GET_FORUM_CATEGORY_BY_ID:
      return {
        ...state,
        forumCategory: action.payload,
        loading: false,
      };

    case CREATE_FORUM_CATEGORY:
      return {
        ...state,
        forumCategories: [action.payload, ...state.forumCategories],
        loading: false,
      };

    case UPDATE_FORUM_CATEGORY:
      return {
        ...state,
        forumCategories: state.forumCategories.map((category) =>
          category._id === action.payload.id ? action.payload : category
        ),
        loading: false,
      };

    case DELETE_FORUM_CATEGORY:
      return {
        ...state,
        forumCategories: state.forumCategories.filter(
          (category) => category._id !== action.payload
        ),
        loading: false,
      };

    case GET_ALL_FORUM_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_FORUM_POST_BY_ID:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case CREATE_FORUM_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case DELETE_FORUM_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case GET_ALL_FORUM_TOPICS:
      return {
        ...state,
        forumTopics: action.payload,
        loading: false,
      };
    case GET_FORUM_TOPIC_BY_ID:
      return {
        ...state,
        forumTopic: action.payload,
        loading: false,
      };
    case CREATE_FORUM_TOPIC:
      return {
        ...state,
        topics: [action.payload, ...state.topics],
        loading: false,
      };
    case UPDATE_FORUM_TOPIC:
      return {
        ...state,
        topics: state.topics.map((topic) =>
          topic._id === payload.id ? action.payload : topic
        ),
        loading: false,
      };
    case DELETE_FORUM_TOPIC:
      return {
        ...state,
        topics: state.topics.filter((topic) => topic._id !== action.payload),
        loading: false,
      };
    case FORUM_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
