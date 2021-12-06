import { nanoid } from "nanoid";
import { db } from "./firebase";

export const getMessagesApi = () => db.ref("messages").get();

// @TODO сделать отправку сообщения через санки
export const sendMessageApi = (roomId, message) =>
  db
    .ref("messages")
    .child(roomId)
    .push({ id: nanoid(), ...message });
