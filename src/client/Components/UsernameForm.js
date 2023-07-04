import React, { useState } from "react";

import { styles } from "../styles";
import Avatar from "./Button";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const UsernameForm = (props) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    if (username !== "") {
      event.preventDefault();
      setLoading(true);
      props.setUser && props.setUser(username);

      const conversation = {
        imageUrl: "",
        imageAlt: username,
        title: username,
        latestMessageText: "Have joined the chatroom.",
        messages: [],
      };
      try {
        await axios
          .post("/api/conversations", conversation)
          .then((response) => {
            const convID = response.data["_id"];
            const data = {
              room: props.room,
              name: username,
              id: convID,
            };
            props.socket.emit("join_room", data, async (error) => {
              if (error) {
                alert(error);
              }
              const conversationMessage = {
                imageUrl: null,
                imageAlt: null,
                messageText:
                  "I Have joined the chatroom. Looking for some help.",
                isMyMessage: false,
              };
              try {
                await axios.post(
                  `/api/messages/${convID}`,
                  conversationMessage
                );
                // .then((response) => {
                //   const data = {
                //     room: "room2",
                //     author: convID,
                //     message:
                //       "I Have joined the chatroom. Looking for some help.",
                //     time:
                //       new Date(Date.now()).getHours() +
                //       ":" +
                //       new Date(Date.now()).getMinutes(),
                //   };
                //   props.socket.emit("send_message", data);
                // });
              } catch (err) {
                console.log(err);
              }
            });
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div
      style={{
        ...styles.emailFormWindow,
        ...{
          height: props.visible ? "100%" : "0px",
          opacity: props.visible ? "1" : "0",
        },
      }}
    >
      <div style={{ height: "0px" }}>
        <div style={styles.stripe} />
      </div>

      <div
        className="transition-5"
        style={{
          ...styles.loadingDiv,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "0.33" : "0",
          },
        }}
      />
      <LoadingOutlined
        className="transition-5"
        style={{
          ...styles.loadingIcon,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "1" : "0",
            fontSize: "82px",
            top: "calc(50% - 41px)",
            left: "calc(50% - 41px)",
          },
        }}
      />

      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          style={{
            position: "relative",
            left: "calc(50% - 44px)",
            top: "10%",
          }}
        />

        <div style={styles.topText}>
          Welcome to Travelport <br /> support 👋
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{ position: "relative", width: "100%", top: "19.75%" }}
        >
          <input
            placeholder="Your name or agency name"
            onChange={(e) => setUsername(e.target.value)}
            style={styles.emailInput}
          />
        </form>

        <div style={styles.bottomText}>Enter your name to get started.</div>
      </div>
    </div>
  );
};

export default UsernameForm;
