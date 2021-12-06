import {
  CREATE_CONVERSATION,
  HANDLE_CHANGE_MESSAGE_VALUE,
  GET_CONVERSATIONS_SUCCESSS,
  GET_CONVERSATIONS_START,
  GET_CONVERSATIONS_ERROR,
} from "./types";
import { DELETE_CONVERSATION } from "../types";

const initialState = {
  conversations: [],
  conversationsLoading: false,
  conversationsError: null,
};

export const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONVERSATION:
      return {
        ...state,
        conversations: [
          ...state.conversations,
          { title: action.payload, value: "" },
        ],
      };

    case DELETE_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.filter(
          (conversation) => conversation.title !== action.payload
        ),
      };

    case HANDLE_CHANGE_MESSAGE_VALUE:
      return {
        ...state,
        conversations: state.conversations.map((conversation) => {
          return conversation.title === action.payload.roomId
            ? { ...conversation, value: action.payload.value }
            : conversation;
        }),
      };

    case GET_CONVERSATIONS_START:
      return {
        ...state,
        conversationsLoading: true,
        conversationsError: null,
      };

    case GET_CONVERSATIONS_SUCCESSS:
      return {
        ...state,
        conversationsLoading: false,
        conversations: action.payload,
      };

    case GET_CONVERSATIONS_ERROR:
      return {
        ...state,
        conversationsLoading: false,
        conversationsError: action.payload,
      };

    default:
      return state;
  }
};
