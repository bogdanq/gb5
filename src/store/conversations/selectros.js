export const conversationsSelector = (state) =>
  state.conversations.conversations;

export const messageValueSelector = (roomId) => (state) =>
  state.conversations.conversations.find(
    (conversation) => conversation.title === roomId
  )?.value ?? "";
