import { INCREMENT, DECREMENT } from "./types";

const initialSate = { count: 0, userInfo: null };

export const profileReducer = (state = initialSate, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
