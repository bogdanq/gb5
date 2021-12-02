import {
  GET_GISTS_START,
  GET_GISTS_SUCCESS,
  GET_GISTS_ERROR,
  SEARCH_GISTS_ERROR,
  SEARCH_GISTS_START,
  SEARCH_GISTS_SUCCESS,
} from "./types";

const initialState = {
  gists: [],
  gistsLoading: false,
  gistsError: null,

  gistsSearch: [],
  gistsLoadingSearch: false,
  gistsErrorSearch: null,
};

export const gistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GISTS_START:
      return {
        ...state,
        gistsLoading: true,
        gistsError: null,
      };

    case GET_GISTS_SUCCESS:
      return { ...state, gistsLoading: false, gists: action.payload };

    case GET_GISTS_ERROR:
      return { ...state, gistsLoading: false, gistsError: action.payload };

    case SEARCH_GISTS_START:
      return {
        ...state,
        gistsLoadingSearch: true,
        gistsErrorSearch: null,
      };

    case SEARCH_GISTS_SUCCESS:
      return {
        ...state,
        gistsLoadingSearch: false,
        gistsSearch: action.payload,
      };

    case SEARCH_GISTS_ERROR:
      return {
        ...state,
        gistsLoadingSearch: false,
        gistsErrorSearch: action.payload,
      };

    default:
      return state;
  }
};
