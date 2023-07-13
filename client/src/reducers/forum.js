import {
  CLEAR_ERRORS,
  GET_ALL_FORUMS,
  GET_FORUM_BY_ID,
  GET_FORUM_IDS,
  CREATE_FORUM,
  GET_ALL_FORUM_CATEGORIES,
  GET_FORUM_CATEGORY_BY_ID,
  GET_FORUM_CATEGORY_IDS,
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
  GET_FORUM_POSTS_BY_TOPIC_ID,
  GET_FORUM_POST_BY_ID,
  DELETE_FORUM_POST,
  FORUM_ERROR,
  LOADING_FORUMS,
  LOADING_CATEGORIES,
  LOADING_TOPICS,
} from "../actions/types";

const initialState = {
  forums: [],
  forumByIds: [],
  forumsById: {},
  forumCategories: [],
  forumCategoryIds: [],
  forumCategoriesById: {},
  forumPosts: [],
  forumTopics: {},
  forumTopicIds: [],
  forumPost: null,
  forumTopic: null,
  loadingForums: true,
  loadingCategories: true,
  loadingTopics: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
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
    case LOADING_TOPICS:
      return {
        ...state,
        loadingTopics: true,
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
        forumsById: {
          ...state.forumsById,
          [payload._id]: payload,
        },
        forumByIds: [...state.forumByIds, payload._id],
        loadingForums: false,
      };
    case GET_FORUM_IDS:
      return {
        ...state,
        forumIds: action.payload,
        loadingForums: false,
      };
    case CREATE_FORUM:
      return {
        ...state,
        forums: {
          ...state.forums,
          [action.payload._id]: action.payload,
        },
        loadingForums: false,
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
        forumCategoriesById: {
          ...state.forumCategories,
          [payload._id]: payload,
        },
        forumCategoryByIds: {
          ...state.forumCategoryByIds,
          [payload._id]: payload,
        },
        loadingCategories: false,
      };
    case GET_FORUM_CATEGORY_IDS:
      return {
        ...state,
        forumCategoryIds: action.payload,
        loadingCategories: false,
      };
    case CREATE_FORUM_CATEGORY:
      return {
        ...state,
        forumCategories: {
          ...state.forumCategories,
          [action.payload._id]: action.payload,
        },
        loadingCategories: false,
      };
    case UPDATE_FORUM_CATEGORY:
      return {
        ...state,
        forumCategories: state.forumCategories.map((category) =>
          category._id === action.payload.id ? action.payload : category
        ),
        loadingCategories: false,
      };
    case DELETE_FORUM_CATEGORY:
      return {
        ...state,
        forumCategories: state.forumCategories.filter(
          (category) => category._id !== action.payload
        ),
        loadingCategories: false,
      };
    case GET_ALL_FORUM_TOPICS:
      return {
        ...state,
        forumTopics: action.payload,
        loadingTopics: false,
      };
    case GET_FORUM_TOPIC_BY_ID:
      return {
        ...state,
        forumTopics: {
          ...state.forumTopics,
          [payload._id]: payload,
        },
        loadingTopics: false,
      };
    case GET_FORUM_TOPIC_IDS:
      return {
        ...state,
        forumTopicIds: action.payload,
        loadingTopics: false,
      };
    case CREATE_FORUM_TOPIC:
      return {
        ...state,
        topics: [action.payload, ...state.topics],
        loadingTopics: false,
      };
    case UPDATE_FORUM_TOPIC:
      return {
        ...state,
        topics: state.topics.map((topic) =>
          topic._id === payload.id ? action.payload : topic
        ),
        loadingTopics: false,
      };
    case DELETE_FORUM_TOPIC:
      return {
        ...state,
        topics: state.topics.filter((topic) => topic._id !== action.payload),
        loadingTopics: false,
      };
    case GET_ALL_FORUM_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_FORUM_POSTS_BY_TOPIC_ID:
      return {
        ...state,
        forumPosts: action.payload,
        loading: false,
      };
    case GET_FORUM_POST_BY_ID:
      return {
        ...state,
        forumPost: action.payload,
        loading: false,
      };
    case CREATE_FORUM_POST:
      return {
        ...state,
        forumPosts: [action.payload, ...state.forumPosts],
        loading: false,
      };
    case DELETE_FORUM_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
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
