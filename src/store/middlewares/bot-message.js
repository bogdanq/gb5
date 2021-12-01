import { SEND_MESSAGE } from "../messages/types";
import { sendMessage } from "../messages";

export const botSendMessage = (store) => (next) => (action) => {
  if (
    action.type === SEND_MESSAGE &&
    action.payload.message.author === "User"
  ) {
    setTimeout(() => {
      store.dispatch(
        sendMessage(
          { author: "Bot", message: "Hello from bot" },
          action.payload.roomId
        )
      );
    }, 300);
  }

  return next(action);
};
