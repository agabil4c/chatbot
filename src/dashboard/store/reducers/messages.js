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
      //console.log(newMessageDetails);
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
    case "NEW_CONVERSATION_MESSAGES_LOADED": {
      const newState = { ...state };
      const newMessageDetails = { ...newState.messageDetails };
      //console.log(messageDetails);
      const fetchConversationMessages = fetch(
        `http://localhost:3001/api/conversations/conversation/${action.payload.convID}`
      )
        .then((response) => response.json())
        .then((user) => {
          const messages = user;
          //console.log(messages);
          return messages;
        });
      fetchConversationMessages.then((a) => {
        //console.log(a);
        newMessageDetails[action.payload.convID] = a;
      });

      return newState;
    }
    default:
      return state;
  }
};

export default messagesReducer;
