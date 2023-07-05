import {
  GET_ALL_PERMISSIONS,
  GET_RANK_PERMISSIONS,
  UPDATE_USER_RANK,
  CREATE_USER_RANK,
  DELETE_USER_RANK,
  PERMISSIONS_ERROR,
  LOADING_PERMISSIONS } from '../actions/types';

const initialState = {
  permissions: {},
  rankPermissions: null,
  loadingPermissions: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_PERMISSIONS:
      return {
        ...state,
        loadingPermissions: true
      };
    case GET_ALL_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
        loadingPermissions: false
      };
    case GET_RANK_PERMISSIONS:
      return {
        ...state,
        rankPermissions: action.payload,
        loadingPermissions: false
      };
    case UPDATE_USER_RANK:
      return {
        ...state,
        rankPermissions: state.rankPermissions.map(rank => rank._id === payload._id ? payload : rank),
        loadingPermissions: false
      };
    case CREATE_USER_RANK:
      return {
        ...state,
        rankPermissions: [...state.rankPermissions, payload],
        loadingPermissions: false
      };
      
    case DELETE_USER_RANK:
      return {
        ...state,
        rankPermissions: state.rankPermissions.filter(rank => rank._id !== payload),
        loadingPermissions: false
      };
    case PERMISSIONS_ERROR:
      return {
        ...state,
        error: payload,
        loadingPermissions: false
      };
    default:
      return state;
  }
}