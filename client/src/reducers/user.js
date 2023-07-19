import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_ERROR,
  USERS_ERROR,
  LOADING_USERS,
  UPDATE_USER,
  CREATE_USER,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  users: {},
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
        users: action.payload.reduce((obj, user) => {
          obj[user._id] = user;
          return obj;
        }, {}),
        loadingUsers: false,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        users: { ...state.users, [action.payload._id]: action.payload },
        loadingUsers: false,
      };
    case GET_USER_BY_ID_ERROR:
      return { ...state, error: action.payload, loadingUsers: false };
    case CREATE_USER:
      console.log("CREATE_USER reducer");
      console.log(action.payload);
      console.log(action.payload.profile.user);
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.profile.user]: action.payload,
        },
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
