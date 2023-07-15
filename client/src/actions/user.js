import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_ERROR,
  USERS_ERROR,
  LOADING_USERS,
  UPDATE_USER,
  DELETE_USER,
} from "./types";
import api from "../utils/api";

// Get all Artists
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USERS });

    const res = await api.get("/users");
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    dispatch({
      type: USERS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Get User by ID
export const getUserById = (id) => async (dispatch) => {
  dispatch({ type: LOADING_USERS });

  try {
    const res = await api.get(`/users/${id}`);
    console.log(id + "getUserById action");
    console.log(res.data + "getUserById action");
    dispatch({
      type: GET_USER_BY_ID_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    dispatch({
      type: GET_USER_BY_ID_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};
