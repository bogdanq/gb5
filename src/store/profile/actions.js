import {
  TOGLE_VISIBLE_PROFILE,
  UPDATE_PROFILE,
  GET_SESSION_START,
  GET_SESSION_ERROR,
  GET_SESSION_SUCCESSS,
} from "./types";

export const togleVisibleProfile = () => {
  return { type: TOGLE_VISIBLE_PROFILE };
};

export const updateProfile = (profile) => {
  return { type: UPDATE_PROFILE, payload: profile };
};

export const getSessionStart = () => ({
  type: GET_SESSION_START,
});

export const getSessionSuccess = (messages) => ({
  type: GET_SESSION_SUCCESSS,
  payload: messages,
});

export const getSessionError = (error) => ({
  type: GET_SESSION_ERROR,
  payload: error,
});
