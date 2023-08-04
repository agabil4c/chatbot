export const conversationChanged = (conversationId) => ({
  type: "SELECTED_CONVERSATION_CHANGED",
  conversationId,
});

export const conversationsRequested = () => ({
  type: "CONVERSATIONS_REQUESTED",
});

export const conversationDeleted = () => ({
  type: "DELETE_CONVERSATION",
});

export const newMessageAdded = (textMessage) => ({
  type: "NEW_MESSAGE_ADDED",
  textMessage,
});

export const messagesRequested = (
  conversationId,
  numberOfMessages,
  lastMessageId
) => ({
  type: "MESSAGES_REQUESTED",
  payload: {
    conversationId,
    numberOfMessages,
    lastMessageId,
  },
});

export const messagesLoaded = (
  conversationId,
  messages,
  hasMoreMessages,
  lastMessageId
) => ({
  type: "MESSAGES_LOADED",
  payload: {
    conversationId,
    messages,
    hasMoreMessages,
    lastMessageId,
  },
});

export const postMessages = (conversationId, message) => ({
  type: "POST_MESSAGE",
  payload: {
    conversationId,
    message,
  },
});

export const newConversationAdded = (name, text, convID) => ({
  type: "NEW_CONVERSATION_ADDED",
  payload: {
    name,
    text,
    convID,
  },
});

export const newConversationMessagesLoaded = (convID) => ({
  type: "NEW_CONVERSATION_MESSAGES_LOADED",
  payload: {
    convID,
  },
});

export const newConversationMessageAdded = (conversationId, text) => ({
  type: "POST_NEW_CONVERSATION_MESSAGE",
  payload: {
    conversationId,
    text,
  },
});
