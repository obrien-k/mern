import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_ERROR,
  USERS_ERROR,
  LOADING_USERS,
  UPDATE_USER,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  users: [],
  user: null,
  loadingUsers: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_USERS:
      return {
        ...state,
        loadingUsers: true,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loadingUsers: false,
      };
    case GET_USER_BY_ID_SUCCESS:
      return { ...state, user: action.payload, loadingUsers: false };
    case GET_USER_BY_ID_ERROR:
      return { ...state, error: action.payload, loadingUsers: false };
    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload,
        loadingUsers: false,
      };
    case USERS_ERROR:
      return {
        ...state,
        error: payload,
        loadingUsers: false,
      };
    default:
      return state;
  }
}