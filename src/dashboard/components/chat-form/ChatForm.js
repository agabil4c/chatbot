import React, { useState } from "react";
import FormButton from "../controls/buttons/FormButton";
import AttachmentIcon from "../controls/icons/attachment-icon/AttachmentIcon";
import axios from "axios";
import "./ChatForm.scss";

const isMessageEmpty = (textMessage) => {
  return adjustTextMessage(textMessage).length === 0;
};

const adjustTextMessage = (textMessage) => {
  return textMessage.trim();
};

const ChatForm = ({ selectedConversation, onMessageSubmitted, socket, convId }) => {
  const [textMessage, setTextMessage] = useState("");
  const disableButton = isMessageEmpty(textMessage);
  let formContents = null;
  let handleFormSubmit = null;

  if (selectedConversation) {
    formContents = (
      <>
        <div title="Add Attachment">
          <AttachmentIcon />
        </div>
        <input
          type="text"
          placeholder="type a message"
          value={textMessage}
          onChange={(e) => {
            setTextMessage(e.target.value);
          }}
        />
        <FormButton disabled={disableButton}>Send</FormButton>
      </>
    );

    handleFormSubmit = async (e) => {
      e.preventDefault();
      if (!isMessageEmpty(textMessage)) {
        const message = {
          imageUrl: null,
          imageAlt: null,
          messageText: textMessage,
          createdAt: new Date(),
          isMyMessage: true,
        };

        try {
          await axios
            .post(`http://localhost:3001/api/messages/${convId}`, message)
            .then((response) => {
              const data = {
                room: "room1",
                message: textMessage,
                time:
                  new Date(Date.now()).getHours() +
                  ":" +
                  new Date(Date.now()).getMinutes(),
              };
              onMessageSubmitted(selectedConversation._id, message);
              socket.emit("send_message", data);
            });
        } catch (err) {
          console.log(err);
        }
        setTextMessage("");
      }
    };
  }

  return (
    <form id="chat-form" onSubmit={handleFormSubmit}>
      {formContents}
    </form>
  );
};

export default ChatForm;
