import {
  GET_ALL_COMMUNITIES,
  GET_COMMUNITY_BY_ID,
  COMMUNITIES_ERROR,
  LOADING_COMMUNITIES,
  UPDATE_COMMUNITY,
  CREATE_COMMUNITY,
  DELETE_COMMUNITY,
  GET_COMMUNITY_GROUPS,
  CREATE_GROUP,
  COMMUNITY_GROUPS_ERROR,
  LOADING_COMMUNITY_GROUPS,
  GET_ALL_CONTRIBUTIONS,
  GET_COMMUNITY_CONTRIBUTIONS,
  GET_GROUP_CONTRIBUTIONS,
  GET_CONTRIBUTION_BY_ID,
  CREATE_CONTRIBUTION,
  UPDATE_CONTRIBUTION,
  DELETE_CONTRIBUTION,
  LOADING_CONTRIBUTIONS,
  CONTRIBUTIONS_ERROR,
} from "./types";
import api from "../utils/api";

// Get all Communities
export const getAllCommunities = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_COMMUNITIES });

    const res = await api.get("/communities");
    dispatch({
      type: GET_ALL_COMMUNITIES,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: COMMUNITIES_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Get Community by ID
export const getCommunityById = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_COMMUNITIES });

    const res = await api.get(`/communities/${id}`);
    dispatch({
      type: GET_COMMUNITY_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: COMMUNITIES_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Create a new Community
export const createCommunity = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_COMMUNITIES });

    const res = await api.post("/communities", formData);
    dispatch({
      type: CREATE_COMMUNITY,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: COMMUNITIES_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Get Community's Groups by its ID
export const getCommunityGroups = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_COMMUNITY_GROUPS });

    const res = await api.get(`/communities/${id}/groups`);
    dispatch({
      type: GET_COMMUNITY_GROUPS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: COMMUNITY_GROUPS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Create a new Group
export const createGroup = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_COMMUNITY_GROUPS });

    const res = await api.post("/groups", formData);
    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: COMMUNITY_GROUPS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Get all Contributions
export const getAllContributions = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CONTRIBUTIONS });

    const res = await api.get("/contributions");
    dispatch({
      type: GET_ALL_CONTRIBUTIONS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: CONTRIBUTIONS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Get Community's Contributions by its ID
export const getCommunityContributions = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CONTRIBUTIONS });

    const res = await api.get(`/communities/${id}/contributions`);
    dispatch({
      type: GET_COMMUNITY_CONTRIBUTIONS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: CONTRIBUTIONS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Get Group's Contributions by its ID
export const getGroupContributions = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CONTRIBUTIONS });

    const res = await api.get(`/groups/${id}/contributions`);
    dispatch({
      type: GET_GROUP_CONTRIBUTIONS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: CONTRIBUTIONS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Get Contribution by ID
export const getContributionById = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CONTRIBUTIONS });

    const res = await api.get(`/contributions/${id}`);
    dispatch({
      type: GET_CONTRIBUTION_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: CONTRIBUTIONS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Create a new Contribution
export const createContribution = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CONTRIBUTIONS });

    const res = await api.post("/contributions", formData);
    dispatch({
      type: CREATE_CONTRIBUTION,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: CONTRIBUTIONS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Update a Contribution
export const updateContribution = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CONTRIBUTIONS });

    const res = await api.put(`/contributions/${id}`, formData);
    dispatch({
      type: UPDATE_CONTRIBUTION,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: CONTRIBUTIONS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};

// Delete a Contribution
export const deleteContribution = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CONTRIBUTIONS });

    await api.delete(`/contributions/${id}`);
    dispatch({
      type: DELETE_CONTRIBUTION,
      payload: id,
    });
  } catch (error) {
    console.log("Error in action creator:", error);
    const errorResponse = error.response || {};
    dispatch({
      type: CONTRIBUTIONS_ERROR,
      payload: {
        msg: errorResponse.statusText || "Error message not available",
        status: errorResponse.status || "Status code not available",
        error: error.toString(),
      },
    });
  }
};
