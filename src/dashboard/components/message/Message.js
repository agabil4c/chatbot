import React from "react";
import classNames from "classnames";
import dateFormat from "dateformat";

import "./Message.scss";

const Message = ({ isMyMessage, message }) => {
  const messageClass = classNames("message-row", {
    "you-message": isMyMessage,
    "other-message": !isMyMessage,
  });

  const imageThumbnail = isMyMessage ? null : (
    <img
      src={require("../../images/profiles/call-avatar.png").default}
      alt={message.imageAlt}
    />
  );

  return (
    <div className={messageClass}>
      <div className="message-content">
        {imageThumbnail}
        <div className="message-text">{message.messageText}</div>
        <div className="message-time">
          {dateFormat(message.createdAt, "dddd, mmmm dS, yyyy hh:mm:ss ")}
        </div>
      </div>
    </div>
  );
};

export default Message;
