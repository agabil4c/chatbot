import React from "react";

const Message = ({ message }) => {
  return (
    <>
      {message.isBot ? (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "0.5rem",
              fontSize: "1.125rem",
              lineHeight: "1rem",
              maxWidth: "20rem",
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
              order: "2",
              alignItems: "flex-start",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              borderRadius: "0.5rem",
              margin: "0.25rem",
            }}
          >
            <span
              style={{
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                borderRadius: "0.5rem",
                display: "inline-block",
                color: "#ffffff",
                backgroundColor: "#10B981",
              }}
              className="dark:bg-yellow-600 dark:text-white"
            >
              {message.text}
            </span>
          </div>
          <i
            className="fas fa-desktop dark:text-white"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              order: "1",
              borderRadius: "9999px",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            paddingTop: "0.5rem",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "0.625rem",
              fontSize: "1.125rem",
              lineHeight: "1rem",
              maxWidth: "20rem",
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
              order: "1",
              alignItems: "flex-end",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              borderRadius: "0.5rem",
              margin: "0.25rem",
            }}
          >
            <span
              style={{
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                borderRadius: "0.5rem",
                display: "inline-block",
                backgroundColor: "#6366F1",
                color: "#ffffff",
              }}
              className="dark:bg-blue-600 dark:text-white"
            >
              {message.text}
            </span>
          </div>
          <i
            className="fas fa-user dark:text-white"
            style={{
              borderRadius: "9999px",
              order: "1",
              width: "1.5rem",
              height: "1.5rem",
            }}
          />
        </div>
      )}
    </>
  );
};

export default Message;
