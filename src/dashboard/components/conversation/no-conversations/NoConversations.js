import React from "react";

import Button from "../../controls/buttons/Button";

import "./NoConversations.scss";

const NoConversations = ({ handleClick }) => {
  return (
    <div id="no-coversation-layout">
      <div id="no-conversation-content">
        <h2>No Conversations</h2>
        <p>Currently you have no conversations.</p>
        <p>To start a new conversation click the button below.</p>
        <Button onClick={handleClick}>Click to refresh Conversations</Button>
      </div>
    </div>
  );
};

export default NoConversations;
