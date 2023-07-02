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
  UPDATE_FORUM_TOPIC,
  DELETE_FORUM_TOPIC,
  LOADING_FORUMS,
  LOADING_CATEGORIES
} from '../actions/types';

const initialState = {
  posts: [],
  topics: [],
  post: null,
  topic: null,
  forums: [],
  categories: [],
  loadingForums: true,
  loadingCategories: true,
  error: {}
};


export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_FORUMS:
      return {
        ...state,
        loadingForums: true
      };

    case LOADING_CATEGORIES:
      return {
        ...state,
        loadingCategories: true
      };

    case GET_ALL_FORUMS:
      return {
        ...state,
        forums: action.payload,
        loadingForums: false
    };

    case GET_FORUM_BY_ID:
      return {
        ...state,
        forum: action.payload,
        loading: false
      };

  case CREATE_FORUM:
    return {
      ...state,
      forums: [action.payload, ...state.forums],
      loading: false
    };

  case GET_ALL_FORUM_CATEGORIES:
    return {
      ...state,
      categories: action.payload,
      loadingCategories: false,
    };

  case GET_FORUM_CATEGORY_BY_ID:
    return {
      ...state,
      category: action.payload,
      loading: false
    };

  case CREATE_FORUM_CATEGORY:
    return {
      ...state,
      categories: [action.payload, ...state.categories],
      loading: false
    };

  case UPDATE_FORUM_CATEGORY:
    return {
      ...state,
      categories: state.categories.map(category =>
        category._id === action.payload.id ? action.payload : category
      ),
      loading: false
    };

  case DELETE_FORUM_CATEGORY:
    return {
      ...state,
      categories: state.categories.filter(category => category._id !== action.payload),
      loading: false
    };

    case GET_ALL_FORUM_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_FORUM_POST_BY_ID:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case CREATE_FORUM_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_FORUM_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case GET_ALL_FORUM_TOPICS:
      return {
        ...state,
        topics: payload,
        loading: false
      };
    case CREATE_FORUM_TOPIC:
      return {
        ...state,
        topics: [payload, ...state.topics],
        loading: false
      };
    case UPDATE_FORUM_TOPIC:
      return {
        ...state,
        topics: state.topics.map(topic => (topic._id === payload.id ? payload : topic)),
        loading: false
      };
    case DELETE_FORUM_TOPIC:
      return {
        ...state,
        topics: state.topics.filter(topic => topic._id !== payload),
        loading: false
      };
    case FORUM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
