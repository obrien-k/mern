import {
  GET_MY_PROFILE,
  LOADING_MY_PROFILE,
  GET_MY_PROFILE_ERROR,
  GET_USER_PROFILE_BY_ID,
  LOADING_USER_PROFILE,
  USER_PROFILE_ERROR,
} from "./types";
import api from "../utils/api";

// Get my profile
export const getMyProfile = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_MY_PROFILE });

    const res = await api.get("/profile/me");
    dispatch({
      type: GET_MY_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    dispatch({
      type: GET_MY_PROFILE_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

export const getUserProfileById = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER_PROFILE });

    const res = await api.get(`/profile/user/${id}`);
    dispatch({
      type: GET_USER_PROFILE_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};
