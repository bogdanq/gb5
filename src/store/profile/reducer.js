import { INCREMENT, DECREMENT } from "./types";

const initialSate = { count: 0, userInfo: null };

export const profileReducer = (state = initialSate, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + action.payload,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - action.payload,
      };
    default:
      return state;
  }
};
