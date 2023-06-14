import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  conversationChanged,
  conversationDeleted,
  conversationsRequested,
  newConversationAdded,
  newConversationMessageAdded,
  postMessages,
} from "../../store/actions";
import ConversationSearch from "../../components/conversation/conversation-search/ConversationSearch";
import NoConversations from "../../components/conversation/no-conversations/NoConversations";
import ConversationList from "../../components/conversation/conversation-list/ConversationList";
import NewConversation from "../../components/conversation/new-conversation/NewConversation";
import ChatTitle from "../../components/chat-title/ChatTitle";
import MessageList from "../message/MessageList";
import ChatForm from "../../components/chat-form/ChatForm";

import "./ChatShell.scss";

const ChatShell = ({
  conversations,
  selectedConversation,
  conversationChanged,
  onMessageSubmitted,
  onDeleteConversation,
  loadConversations,
  newConversations,
  newConversationMessage,
  socket,
}) => {
  const [convId, setconvId] = useState("");
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);
  let conversationContent = (
    <>
      <NoConversations></NoConversations>
    </>
  );

  if (conversations.length > 0) {
    conversationContent = (
      <>
        <MessageList conversationId={selectedConversation._id} />
      </>
    );
  }
  useEffect(() => {
    socket.on("roomData", (data) => {
      const text = data.text;
      data.users.forEach(function (user) {
        newConversations(user, text);
      });
    });
    socket.on("receive_message", (data) => {
      //console.log(data);
      setconvId(data.author);
      newConversationMessage(data.author, data.message);
    });
  }, [socket, newConversations, newConversationMessage]);

  return (
    <div id="chat-container">
      <ConversationSearch conversations={conversations} />
      <ConversationList
        onConversationItemSelected={conversationChanged}
        conversations={conversations}
        selectedConversation={selectedConversation}
      />
      <NewConversation />
      <ChatTitle
        selectedConversation={selectedConversation}
        onDeleteConversation={onDeleteConversation}
      />
      {conversationContent}
      <ChatForm
        selectedConversation={selectedConversation}
        onMessageSubmitted={onMessageSubmitted}
        socket={socket}
        convId={convId}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversationState.conversations,
    selectedConversation: state.conversationState.selectedConversation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  conversationChanged: (conversationId) => {
    dispatch(conversationChanged(conversationId));
  },
  onMessageSubmitted: (conversationId, message) => {
    //dispatch(newMessageAdded(messageText));
    dispatch(postMessages(conversationId, message));
  },
  onDeleteConversation: () => {
    dispatch(conversationDeleted());
  },
  loadConversations: () => {
    dispatch(conversationsRequested());
  },
  newConversations: (name, text) => {
    dispatch(newConversationAdded(name, text));
  },
  newConversationMessage: (conversationId, message) => {
    dispatch(newConversationMessageAdded(conversationId, message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatShell);
