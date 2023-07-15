import {
  GET_MY_PROFILE,
  GET_USER_PROFILE_BY_ID,
  GET_MY_PROFILE_ERROR,
  LOADING_MY_PROFILE,
  LOADING_USER_PROFILE,
  USER_PROFILE_ERROR,
} from "../actions/types";

const initialState = {
  myProfile: null,
  loadingMyProfile: false,
  myProfileError: null,
  userProfile: {},
  loadingUserProfile: false,
  userProfileError: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_MY_PROFILE:
      return {
        ...state,
        loadingMyProfile: true,
      };
    case LOADING_USER_PROFILE:
      return {
        ...state,
        loadingUserProfile: true,
      };
    case GET_MY_PROFILE:
      return {
        ...state,
        myProfile: payload,
        loadingMyProfile: false,
      };
    case GET_USER_PROFILE_BY_ID:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          [payload._id]: payload,
        },
        loadingUserProfile: false,
      };
    case GET_MY_PROFILE_ERROR:
      return {
        ...state,
        myProfileError: payload,
        loadingMyProfile: false,
      };
    case USER_PROFILE_ERROR:
      return {
        ...state,
        userProfileError: payload,
        loadingUserProfile: false,
      };
    default:
      return state;
  }
}
