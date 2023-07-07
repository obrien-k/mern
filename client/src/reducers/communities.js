import {
  GET_ALL_COMMUNITIES,
  GET_COMMUNITY_BY_ID,
  GET_COMMUNITY_GROUPS,
  LOADING_COMMUNITY_GROUPS,
  COMMUNITY_GROUPS_ERROR,
  LOADING_COMMUNITIES,
  COMMUNITIES_ERROR,
} from "../actions/types";

const initialState = {
  communities: [],
  community: [],
  communityGroups: [],
  loadingCommunities: true,
  loadingCommunityGroups: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_COMMUNITY_GROUPS:
      return {
        ...state,
        loadingCommunityGroups: true,
      };
    case LOADING_COMMUNITIES:
      return {
        ...state,
        loadingCommunities: true,
      };
    case GET_ALL_COMMUNITIES:
      return {
        ...state,
        communities: action.payload,
        loadingCommunities: false,
      };
    case GET_COMMUNITY_BY_ID:
      return {
        ...state,
        community: action.payload,
        loadingCommunities: false,
      };
    case GET_COMMUNITY_GROUPS:
      return {
        ...state,
        communityGroups: action.payload,
        loadingCommunityGroups: false,
      };
    case COMMUNITIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case COMMUNITY_GROUPS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
