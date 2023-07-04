import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import Messages from "./Messages";
import axios from "axios";

const Chat = (props) => {
  const [responses, setResponses] = useState([]);
  const [convId, setconvId] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (props.visible) {
      setTimeout(() => {
        setShowChat(true);
      }, 500);
    }
  });

  useEffect(() => {
    props.socket.on("message", (message) => {
      const responseData = {
        text: message.text,
        isBot: true,
      };
      setconvId(message.id);

      setResponses((responses) => [...responses, responseData]);
    });

    props.socket.on("receive_message", (data) => {
      //console.log(data);
      const responseData = {
        text: data.message,
        isBot: true,
      };
      setResponses((responses) => [...responses, responseData]);
    });
  }, [props.socket]);

  const handleMessageSubmit = async (message) => {
    const conversationMessage = {
      imageUrl: null,
      imageAlt: null,
      messageText: message,
      isMyMessage: false,
    };
    try {
      await axios
        .post(`/api/messages/${convId}`, conversationMessage)
        .then((response) => {
          const data = {
            room: "room2",
            author: convId,
            message: message,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
          props.socket.emit("send_message", data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    const message = {
      text: currentMessage,
      author: props.user,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      isBot: false,
    };
    if (event.key === "Enter" && event.target.value !== "") {
      setResponses((responses) => [...responses, message]);
      handleMessageSubmit(message.text);
      setCurrentMessage("");
    }
  };

  return (
    <div
      className="transition-5"
      style={{
        ...styles.chatEngineWindow,
        ...{
          height: props.visible ? "100%" : "0px",
          zIndex: props.visible ? "100" : "0",
        },
      }}
    >
      {showChat && (
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              className=" dark:bg-gray-900"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                height: "auto",
                paddingTop: "16px",
                paddingBottom: "16px",
                marginTop: "12px",
                marginBottom: "8px",
                borderRadius: "12px",
                backgroundColor: "#F3F4F6",
              }}
            >
              <div
                className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2"
                style={{
                  ...styles.messagesSection,
                  ...{
                    display: "flex",
                    flexDirection: "column",
                    padding: "12px",
                    overflowY: "auto",
                    marginTop: "1rem",
                    WebkitOverflowScrolling: "touch",
                  },
                }}
              >
                <Messages messages={responses} />
              </div>

              <div
                className=" dark:border-gray-600 "
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  borderTopWidth: "2px",
                  borderColor: "#E5E7EB",
                }}
              >
                <div
                  className=" dark:bg-gray-800 lg:max-w-lg "
                  style={{
                    width: "100%",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={handleMessageChange}
                    onKeyDown={handleSubmit}
                    placeholder="Enter your message here"
                    className=" dark:bg-gray-700 dark:border-gray-900 dark:text-white dark:placeholder-gray-100 focus:outline-none focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 dark:focus:placeholder-white focus:ring-1 focus:ring-indigo-300 sm:text-sm"
                    style={{
                      display: "block",
                      width: "100%",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                      paddingRight: "0.75rem",
                      paddingLeft: "0.75rem",
                      fontSize: "1.125rem",
                      lineHeight: "1.25rem",
                      color: "#6B7280",
                      backgroundColor: "#ffffff",
                      borderWidth: "1px",
                      borderRadius: "0.375rem",
                      borderColor: "#D1D5DB",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
