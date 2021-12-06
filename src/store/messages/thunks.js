import { handleChangeMessageValue } from "../conversations";
import {
  sendMessage,
  getMessagesStart,
  getMessagesSuccess,
  getMessagesError,
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
