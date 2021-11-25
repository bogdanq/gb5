import { nanoid } from "nanoid";
import { SEND_MESSAGE } from "./types";
import { DELETE_CONVERSATION } from "../types";

const initialState = {
  messages: {
    room1: [
      { date: new Date(), message: "HEllo", author: "Bot", id: nanoid() },
    ],
  },
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [
            ...(state.messages[action.payload.roomId] ?? []),
            { ...action.payload.message, date: new Date(), id: nanoid() },
          ],
        },
      };
    case DELETE_CONVERSATION:
      delete state.messages[action.payload];

      return { ...state };
    default:
      return state;
  }
};
