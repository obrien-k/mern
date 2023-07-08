import {
  GET_ALL_ARTISTS,
  GET_ARTIST_BY_ID,
  ARTISTS_ERROR,
  LOADING_ARTISTS,
  UPDATE_ARTIST,
  GET_ARTIST_GROUPS,
  ARTIST_GROUPS_ERROR,
  LOADING_ARTIST_GROUPS,
} from "../actions/types";

const initialState = {
  artists: [],
  artist: [],
  artistGroups: [],
  loadingArtists: true,
  loadingArtistGroups: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_ARTIST_GROUPS:
      return {
        ...state,
        loadingArtistGroups: true,
      };
    case LOADING_ARTISTS:
      return {
        ...state,
        loadingArtists: true,
      };
    case GET_ALL_ARTISTS:
      return {
        ...state,
        artists: action.payload,
        loadingArtists: false,
      };
    case GET_ARTIST_BY_ID:
      return {
        ...state,
        artist: action.payload,
        loadingArtists: false,
      };
    case GET_ARTIST_GROUPS:
      return {
        ...state,
        artistGroups: action.payload,
        loadingArtistGroups: false,
      };
    case ARTISTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ARTIST_GROUPS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
