import React from "react";

import "./NewConversation.scss";
import RefreshIcon from "../../controls/icons/refresh-icon/RefreshIcon";

const NewConversation = ({ handleClick }) => {
  return (
    <div onClick={handleClick} id="new-message-container">
      <RefreshIcon />
    </div>
  );
};

export default NewConversation;
