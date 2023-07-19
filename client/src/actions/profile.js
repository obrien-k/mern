import {
  GET_MY_PROFILE,
  LOADING_MY_PROFILE,
  GET_MY_PROFILE_ERROR,
  GET_USER_PROFILE_BY_ID,
  LOADING_USER_PROFILE,
  USER_PROFILE_ERROR,
  DELETE_MY_PROFILE,
  DELETE_PROFILE_ERROR,
  UPDATE_MY_PROFILE,
  UPDATE_PROFILE_ERROR,
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

// Delete profile
export const deleteMyProfile = () => async (dispatch) => {
  try {
    await api.delete("/profile");

    dispatch({ type: DELETE_MY_PROFILE });
  } catch (error) {
    const errorResponse = error.response || {};
    dispatch({
      type: DELETE_PROFILE_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Update profile
export const updateMyProfile = (profileData) => async (dispatch) => {
  try {
    const res = await api.put("/profile/me", profileData);

    dispatch({
      type: UPDATE_MY_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};
