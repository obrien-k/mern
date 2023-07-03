import {
  GET_ALL_COMMUNITIES,
  LOADING_COMMUNITIES,
  COMMUNITIES_ERROR
} from '../actions/types';

const initialState = {
  communities:[],
  loadingCommunities: false,
  error: {}
};


export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_COMMUNITIES:
      return {
        ...state,
        loadingCommunities: true
    };
    case GET_ALL_COMMUNITIES:
      return {
        ...state,
        communities: action.payload,
        loadingCommunities: false
    };
    case COMMUNITIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
