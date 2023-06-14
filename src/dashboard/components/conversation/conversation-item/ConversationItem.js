import React from "react";
import classNames from "classnames";
import dateFormat from "dateformat";

import "./ConversationItem.scss";

const ConversationItem = ({
  conversation,
  isActive,
  onConversationItemSelected,
}) => {
  const className = classNames("conversation", {
    active: isActive,
  });

  function formatDate(date) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);

    // Split the formatted date into day, month, and year parts
    const [month, day, year] = formattedDate.split(" ");

    // Convert the month abbreviation to uppercase
    const capitalizedMonth = month.toUpperCase();

    // Return the formatted date with uppercase month abbreviation and desired format
    return `${day} ${capitalizedMonth} ${year}`;
  }

  return (
    <div
      className={className}
      onClick={() => onConversationItemSelected(conversation._id)}
    >
      <img
        src={require("../../../images/profiles/user__1.png").default}
        alt={conversation.imageAlt}
      />
      <div className="title-text">{conversation.title}</div>
      <div className="created-date">{formatDate(conversation.createdAt)}</div>
      <div className="conversation-message">
        {conversation.latestMessageText}
      </div>
    </div>
  );
};

export default ConversationItem;
