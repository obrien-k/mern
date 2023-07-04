import {
  GET_ALL_COMMUNITIES,
  GET_COMMUNITY_GROUPS,
  COMMUNITY_GROUPS_ERROR,
  LOADING_COMMUNITY_GROUPS,
  COMMUNITIES_ERROR,
  LOADING_COMMUNITIES
} from './types';
import api from '../utils/api';

// Communities
export const getAllCommunities = () => async dispatch => {
  try {
    dispatch({ type: LOADING_COMMUNITIES });

    const res = await api.get('/communities');
    dispatch({
      type: GET_ALL_COMMUNITIES,
      payload: res.data
    });
  } catch (error) {
    console.log('Error in action creator:', error); // Log the full error
    const errorResponse = error.response || {};
    dispatch({
        type: COMMUNITIES_ERROR,
        payload: { 
            msg: errorResponse.statusText || 'Error message not available',
            status: errorResponse.status || 'Status code not available',
            error: error.toString() // Adding the full error as a string.
        }
    });
  }
};

// GROUPS
export const getCommunityGroups = id => async dispatch => {
  try {
    dispatch({ type: LOADING_COMMUNITY_GROUPS });

    const res = await api.get(`/communities/${id}/groups`);
    dispatch({
      type: GET_COMMUNITY_GROUPS,
      payload: res.data
    });
  } catch (error) {
    console.log('Error in action creator:', error); // Log the full error
    const errorResponse = error.response || {};
    dispatch({
        type: COMMUNITY_GROUPS_ERROR,
        payload: { 
            msg: errorResponse.statusText || 'Error message not available',
            status: errorResponse.status || 'Status code not available',
            error: error.toString() // Adding the full error as a string.
        }
    });
  }
};