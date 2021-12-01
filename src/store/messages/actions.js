import { SEND_MESSAGE, DELETE_MESSAGE_BY_ID } from "./types";

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
