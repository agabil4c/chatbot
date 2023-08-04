const initialState = {
  conversations: [],
  selectedConversation: {},
};

initialState.selectedConversation = initialState.conversations[1];

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONVERSATIONS_LOADED": {
      const newState = { ...state };
      newState.conversations = action.payload.conversations
        ? action.payload.conversations
        : [];
      newState.selectedConversation = action.payload.selectedConversation;

      return newState;
    }
    case "SELECTED_CONVERSATION_CHANGED": {
      const newState = { ...state };
      newState.selectedConversation = newState.conversations.find(
        (conversation) => conversation._id === action.conversationId
      );

      return newState;
    }
    case "DELETE_CONVERSATION": {
      if (state.selectedConversation) {
        const newState = { ...state };

        let selectedConversationIndex = newState.conversations.findIndex(
          (c) => c.id === newState.selectedConversation._id
        );
        newState.conversations.splice(selectedConversationIndex, 1);

        if (newState.conversations.length > 0) {
          if (selectedConversationIndex > 0) {
            --selectedConversationIndex;
          }

          newState.selectedConversation =
            newState.conversations[selectedConversationIndex];
        } else {
          newState.selectedConversation = null;
        }

        return newState;
      }

      return state;
    }

    case "MESSAGES_LOADEDD": {
      const { conversationId, messages, hasMoreMessages, lastMessageId } =
        action.payload;

      const currentConversationMapEntry =
        state.conversations[conversationId].messages;

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

    case "NEW_CONVERSATION_ADDED": {
      const newState = { ...state };
      //const length = newState.conversations.length;

      newState.conversations.unshift({
        _id: action.payload.convID,
        imageUrl: require("../../images/profiles/daryl.png"),
        imageAlt: action.payload.name,
        title: action.payload.name,
        createdAt:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        latestMessageText: action.payload.text,
        messages: [],
      });
      //console.log(newState);
      // yield put(
      //   newConversationMessageAdded(length + 1, action.payload.text)
      // );

      return newState;
    }
    case "NEW_MESSAGE_ADDED": {
      if (state.selectedConversation) {
        const newState = { ...state };
        newState.selectedConversation = { ...newState.selectedConversation };

        newState.selectedConversation.messages.unshift({
          imageUrl: null,
          imageAlt: null,
          messageText: action.textMessage,
          createdAt: "Apr 16",
          isMyMessage: true,
        });

        return newState;
      }

      return state;
    }

    default:
      return state;
  }
};

export default conversationsReducer;
