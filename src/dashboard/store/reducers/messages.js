const initialState = {
  messageDetails: {},
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MESSAGES_LOADED": {
      const { conversationId, messages, hasMoreMessages, lastMessageId } =
        action.payload;
      const currentConversationMapEntry = state.messageDetails[conversationId];
      const newConversationMapEntry = {
        hasMoreMessages,
        lastMessageId,
        messages: [],
      };

      if (currentConversationMapEntry) {
        newConversationMapEntry.messages = [
          ...currentConversationMapEntry.messages,
        ];
      }

      newConversationMapEntry.messages = [
        ...newConversationMapEntry.messages,
        ...messages,
      ];

      const newMessageDetails = { ...state.messageDetails };

      newMessageDetails[conversationId] = newConversationMapEntry;

      return { messageDetails: newMessageDetails };
    }
    case "POST_MESSAGE": {
      const newState = { ...state };
      newState.messageDetails = { ...newState.messageDetails };
      newState.messageDetails[action.payload.conversationId].messages.unshift(
        action.payload.message
      );
      return newState;
    }
    case "POST_NEW_CONVERSATION_MESSAGE": {
      const newState = { ...state };
      newState.messageDetails = { ...newState.messageDetails };
      newState.messageDetails[action.payload.conversationId].messages.unshift({
        imageUrl: null,
        imageAlt: null,
        messageText: action.payload.text,
        createdAt: new Date(),
        isMyMessage: false,
      });

      return newState;
    }
    default:
      return state;
  }
};

export default messagesReducer;
