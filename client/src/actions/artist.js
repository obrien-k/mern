import {
  GET_ALL_ARTISTS,
  GET_ARTIST_BY_ID,
  ARTISTS_ERROR,
  LOADING_ARTISTS,
  UPDATE_ARTIST,
  GET_ARTIST_GROUPS,
  ARTIST_GROUPS_ERROR,
  LOADING_ARTIST_GROUPS,
} from "./types";
import api from "../utils/api";

// Get all Artists
export const getAllArtists = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ARTISTS });

    const res = await api.get("/artist");
    dispatch({
      type: GET_ALL_ARTISTS,
      payload: res.data,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    dispatch({
      type: ARTISTS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Get Artist by ID
export const getArtistById = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ARTISTS });

    const res = await api.get(`/artist/${id}`);
    dispatch({
      type: GET_ARTIST_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    dispatch({
      type: ARTISTS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Get Artist's Groups by its ID
export const getArtistGroups = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ARTIST_GROUPS });

    const res = await api.get(`/artist/${id}/groups`);
    dispatch({
      type: GET_ARTIST_GROUPS,
      payload: res.data,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    dispatch({
      type: ARTIST_GROUPS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};
