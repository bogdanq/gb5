import { nanoid } from "nanoid";
import {
  SEND_MESSAGE,
  DELETE_MESSAGE_BY_ID,
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESSS,
  GET_MESSAGES_ERROR,
  SEND_MESSAGES_START,
  SEND_MESSAGES_SUCCESSS,
  SEND_MESSAGES_ERROR,
} from "./types";
import { DELETE_CONVERSATION } from "../types";

const initialState = {
  messages: {},
  messagesLoading: false,
  messagesError: null,
  sendMessageLoading: false,
  sendMessageError: null,
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGES_START:
      return { ...state, sendMessageLoading: true, sendMessageError: null };

    case SEND_MESSAGES_ERROR:
      return {
        ...state,
        sendMessageLoading: false,
        sendMessageError: action.payload,
      };

    case SEND_MESSAGE:
    case SEND_MESSAGES_SUCCESSS:
      return {
        ...state,
        sendMessageLoading: false,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [
            ...(state.messages[action.payload.roomId] ?? []),
            { ...action.payload.message, date: new Date() },
          ],
        },
      };

    case DELETE_CONVERSATION:
      delete state.messages[action.payload];

      return { ...state };

    case DELETE_MESSAGE_BY_ID:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: state.messages[action.payload.roomId].filter(
            (message) => message.id !== action.payload.messageId
          ),
        },
      };

    case GET_MESSAGES_START:
      return {
        ...state,
        messagesLoading: true,
        messagesError: null,
      };

    case GET_MESSAGES_SUCCESSS:
      return {
        ...state,
        messagesLoading: false,
        messages: action.payload,
      };

    case GET_MESSAGES_ERROR:
      return {
        ...state,
        messagesLoading: false,
        messagesError: action.payload,
      };

    default:
      return state;
  }
};
