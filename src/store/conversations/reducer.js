import { CREATE_CONVERSATION, HANDLE_CHANGE_MESSAGE_VALUE } from "./types";
import { DELETE_CONVERSATION } from "../types";

const initialState = {
  conversations: [
    {
      title: "room1",
      value: "",
    },
    {
      title: "room2",
      value: "",
    },
  ],
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

    default:
      return state;
  }
};
