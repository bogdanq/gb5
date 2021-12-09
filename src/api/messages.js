import { nanoid } from "nanoid";
import { db } from "./firebase";

export const getMessagesApi = () => db.ref("messages").get();

export const sendMessageApi = (roomId, message) => {
  return db
    .ref("messages")
    .child(roomId)
    .push({ id: nanoid(), ...message });
};
