import React, { useEffect, useState } from "react";

import { styles } from "../styles";
import UsernameForm from "./UsernameForm";
import Chat from "./Chat";
import io from "socket.io-client";

//const socket = io.connect("http://localhost:3001");
let socket;
const SupportWindow = (props) => {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const ENDPOINT = "http://localhost:3001";
  socket = io(ENDPOINT, {
    forceNew: true,
    origins: "http://localhost:3001",
  });
  let room_ = "room1";
  useEffect(() => {
    setRoom(room_);
  }, [room_]);
  return (
    <div
      className="transition-5"
      style={{
        ...styles.supportWindow,
        ...{ opacity: props.visible ? "1" : "0" },
      }}
    >
      <UsernameForm
        visible={user === null || room === null}
        setUser={(user) => setUser(user)}
        room={room}
        socket={socket}
      />

      <Chat
        visible={user !== null && room !== null}
        user={user}
        room={room}
        socket={socket}
      />
    </div>
  );
};

export default SupportWindow;
