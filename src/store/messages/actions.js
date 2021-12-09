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

export const sendMessage = (message, roomId, delay = 500) => {
  return {
    type: SEND_MESSAGE,
    payload: { message, roomId },
    meta: {
      delay,
    },
  };
};

export const deleteMessageById = (messageId, roomId) => ({
  type: DELETE_MESSAGE_BY_ID,
  payload: { messageId, roomId },
});

export const getMessagesStart = () => ({
  type: GET_MESSAGES_START,
});

export const getMessagesSuccess = (messages) => ({
  type: GET_MESSAGES_SUCCESSS,
  payload: messages,
});

export const getMessagesError = (error) => ({
  type: GET_MESSAGES_ERROR,
  payload: error,
});

export const sendMessageStart = () => ({
  type: SEND_MESSAGES_START,
});

export const sendMessageSuccess = (roomId, message) => ({
  type: SEND_MESSAGES_SUCCESSS,
  payload: { roomId, message },
});

export const sendMessageError = (error) => ({
  type: SEND_MESSAGES_ERROR,
  payload: error,
});
