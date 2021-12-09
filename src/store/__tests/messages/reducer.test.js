import {
  messagesReducer,
  sendMessageStart,
  sendMessageSuccess,
  sendMessageError,
  getMessagesStart,
  getMessagesSuccess,
  getMessagesError,
  deleteMessageById,
} from "../../messages";
import { deleteConversation } from "../../conversations";

describe("message reducer", () => {
  describe("send message", () => {
    it("start", () => {
      const state = messagesReducer(
        {
          sendMessageLoading: false,
          sendMessageError: "some error",
        },
        sendMessageStart()
      );

      expect(state.sendMessageLoading).toBe(true);
      expect(state.sendMessageError).toBe(null);
      // expect(state).toEqual({
      //   sendMessageLoading: true,
      //   sendMessageError: null,
      // });
    });

    it("success", () => {
      const state = messagesReducer(
        {
          sendMessageLoading: true,
          messages: {},
        },
        sendMessageSuccess("room1", { author: "User", message: "test" })
      );

      expect(state.sendMessageLoading).toBe(false);
      expect(state.messages.room1.length).toBe(1);
      expect(state.messages.room1[0].author).toBe("User");
      expect(state.messages.room1[0].message).toBe("test");
    });
    it("error", () => {
      const ERROR = "error";
      const state = messagesReducer(
        {
          sendMessageLoading: true,
          sendMessageError: null,
        },
        sendMessageError(ERROR)
      );

      expect(state.sendMessageLoading).toBe(false);
      expect(state.sendMessageError).toBe(ERROR);
    });
  });

  describe("get messages", () => {
    it("start", () => {
      const state = messagesReducer(
        {
          messagesLoading: false,
          messagesError: "some error",
        },
        getMessagesStart()
      );

      expect(state.messagesLoading).toBe(true);
      expect(state.messagesError).toBe(null);
    });
    it("success", () => {
      const MESSAGES = {
        room1: [{ author: "User", message: "test" }],
        room2: [{ author: "User", message: "test" }],
      };

      const state = messagesReducer(
        {
          messagesLoading: true,
          messages: {},
        },
        getMessagesSuccess(MESSAGES)
      );

      expect(state.messagesLoading).toBe(false);
      expect(state.messages).toEqual(MESSAGES);
    });
    it("error", () => {
      const ERROR = "some error";

      const state = messagesReducer(
        {
          messagesLoading: true,
          messagesError: null,
        },
        getMessagesError(ERROR)
      );

      expect(state.messagesLoading).toBe(false);
      expect(state.messagesError).toBe(ERROR);
    });
  });
  describe("other types", () => {
    it("delete conversation", () => {
      const state = messagesReducer(
        {
          messages: {
            room1: [],
          },
        },
        deleteConversation("room1")
      );

      expect(state.messages.room1).toBeUndefined();
      expect(state.messages).toEqual({});
    });
    it("delete message by id", () => {
      const state = messagesReducer(
        {
          messages: {
            room1: [{ id: 1 }, { id: 2 }],
          },
        },
        deleteMessageById(1, "room1")
      );

      expect(state.messages.room1.length).toBe(1);
      expect(state.messages.room1).toEqual([{ id: 2 }]);
    });
  });
});
