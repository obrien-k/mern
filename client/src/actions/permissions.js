import {
  GET_ALL_PERMISSIONS,
  GET_RANK_PERMISSIONS,
  UPDATE_USER_RANK,
  CREATE_USER_RANK,
  DELETE_USER_RANK,
  PERMISSIONS_ERROR,
  LOADING_PERMISSIONS,
  LOADING_RANK_PERMISSIONS
} from './types';
import api from '../utils/api';

// Get all UserRank Permissions
export const getAllPermissions = () => async dispatch => {
  try {
    dispatch({ type: LOADING_PERMISSIONS });

    const res = await api.get('/tools/permissions');
    dispatch({
      type: GET_ALL_PERMISSIONS,
      payload: res.data
    });
  } catch (error) {
    console.log('Error in action creator:', error); // Log the full error
    const errorResponse = error.response || {};
    dispatch({
        type: PERMISSIONS_ERROR,
        payload: { 
            msg: errorResponse.statusText || 'Error message not available',
            status: errorResponse.status || 'Status code not available',
            error: error.toString() // Adding the full error as a string.
        }
    });
  }
};

// Get UserRank permission by ID
export const getRankPermissions = id => async dispatch => {
  try {
    dispatch({ type: LOADING_PERMISSIONS});

    const res = await api.get(`/tools/permissions/${id}`);
    console.log('Server response:' + JSON.stringify(res.data));
    dispatch({
      type: GET_RANK_PERMISSIONS,
      payload: res.data
    });
  } catch (error) {
    console.log('Error in action creator:', error);
    const errorResponse = error.response || {};
    dispatch({
        type: PERMISSIONS_ERROR,
        payload: { 
            msg: errorResponse.statusText || 'Error message not available',
            status: errorResponse.status || 'Status code not available',
            error: error.toString()
        }
    });
  }
};

// Create new user class
export const createRank = rankData => async dispatch => {
  try {
    const res = await api.post('/tools/permissions', rankData);
    console.log('Server response:' + JSON.stringify(res.data));
    dispatch({
      type: CREATE_USER_RANK,
      payload: res.data
    });
  } catch (error) {
    console.log('Error in action creator:', error);
    const errorResponse = error.response || {};
    dispatch({
        type: PERMISSIONS_ERROR,
        payload: { 
            msg: errorResponse.statusText || 'Error message not available',
            status: errorResponse.status || 'Status code not available',
            error: error.toString()
        }
    });
}
};

// Update user class
export const updateUserRank = (id, rankData) => async dispatch => {
  try {
    const res = await api.put(`/tools/permissions/${id}`, rankData);
    dispatch({
      type: UPDATE_USER_RANK,
      payload: { _id: id, ...res.data }
    });
  } catch (error) {
    console.log('Error in action creator:', error);
    const errorResponse = error.response || {};
    dispatch({
        type: PERMISSIONS_ERROR,
        payload: { 
            msg: errorResponse.statusText || 'Error message not available',
            status: errorResponse.status || 'Status code not available',
            error: error.toString()
        }
    });
  }
};

// Delete user class
export const deleteUserRank = id => async dispatch => {
  try {
    await api.delete(`/tools/permissions/${id}`);
    dispatch({
      type: DELETE_USER_RANK,
      payload: {_id: id}
    });
  } catch (error) {
    console.log('Error in action creator:', error);
    const errorResponse = error.response || {};
    dispatch({
        type: PERMISSIONS_ERROR,
        payload: { 
            msg: errorResponse.statusText || 'Error message not available',
            status: errorResponse.status || 'Status code not available',
            error: error.toString()
        }
    });
  }
};

