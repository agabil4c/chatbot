import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  conversationChanged,
  conversationDeleted,
  conversationsRequested,
  newConversationAdded,
  newConversationMessagesLoaded,
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
  newConversationsMessagesLoaded,
  newConversationMessage,
  socket,
}) => {
  const [convId, setconvId] = useState("");
  const [receiverId, setreceiverId] = useState("");
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const handleClick = () => {
    window.location.reload();
  };
  let conversationContent = (
    <>
      <NoConversations handleClick={handleClick}></NoConversations>
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
      console.log(data);
      data.users.forEach(function (user) {
        newConversations(user, text, data.id);
        window.location.reload();
        //loadConversations();
        //newConversationsMessagesLoaded(data.id);
      });
    });
    socket.on("receive_message", (data) => {
      //console.log(data);
      setconvId(data.author);
      setreceiverId(data.sender_id);
      newConversationMessage(data.author, data.message);
    });
    socket.on("admin_message", (data) => {
      //console.log(data);
      setconvId(data.author);
      newConversationMessage(data.author, data.text);
    });
  }, [
    socket,
    newConversations,
    newConversationsMessagesLoaded,
    newConversationMessage,
  ]);

  return (
    <div id="chat-container">
      <ConversationSearch conversations={conversations} />
      <ConversationList
        onConversationItemSelected={conversationChanged}
        conversations={conversations}
        selectedConversation={selectedConversation}
      />
      <NewConversation
        handleClick={handleClick}
        conversations={conversations}
      />
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
        receiverId={receiverId}
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
  newConversations: (name, text, convID) => {
    dispatch(newConversationAdded(name, text, convID));
  },
  newConversationsMessagesLoaded: (convID) => {
    dispatch(newConversationMessagesLoaded(convID));
  },
  newConversationMessage: (conversationId, message) => {
    dispatch(newConversationMessageAdded(conversationId, message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatShell);
