import { db } from "./firebase";

export const getConversationsApi = () => db.ref("conversations").get();

// @TODO сделать создание комнаты через санки
export const addConversationApi = (roomId) => {
  return db
    .ref("conversations")
    .child(roomId)
    .set({ title: roomId, value: "" });
};
