import { handleChangeMessageValue } from "../conversations";
import {
  sendMessage,
  getMessagesStart,
  getMessagesSuccess,
  getMessagesError,
  sendMessageStart,
  sendMessageSuccess,
  sendMessageError,
} from "./actions";

export const sendMessageWithBot =
  (message, roomId) => async (dispatch, getState) => {
    dispatch(sendMessage(message, roomId));
    dispatch(handleChangeMessageValue("", roomId));

    if (message.author === "User") {
      setTimeout(() => {
        dispatch(
          sendMessage(
            { author: "Bot", message: "Hello bot from thunk" },
            roomId
          )
        );
      }, 500);
    }
  };

export const sendMessageFB = (message, roomId) => async (dispatch, _, api) => {
  try {
    dispatch(sendMessageStart());

    await api.sendMessageApi(roomId, message);

    dispatch(sendMessageSuccess(roomId, message));
    dispatch(handleChangeMessageValue("", roomId));

    if (message.author !== "Bot") {
      setTimeout(() => {
        dispatch(
          sendMessageFB(
            { author: "Bot", message: "Hello bot from thunk to bd" },
            roomId
          )
        );
      }, 500);
    }
  } catch (e) {
    dispatch(sendMessageError(e));
  }
};

export const getMessagesFB = () => async (dispatch, _, api) => {
  const messages = {};

  try {
    dispatch(getMessagesStart());

    const snapshot = await api.getMessagesApi();

    snapshot.forEach((snap) => {
      messages[snap.key] = Object.values(snap.val());
    });

    dispatch(getMessagesSuccess(messages));
  } catch (e) {
    dispatch(getMessagesError(e));
  }
};
