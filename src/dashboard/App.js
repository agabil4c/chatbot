import React, { useEffect } from "react";
import io from "socket.io-client";
import ChatShell from "./containers/shell/ChatShell";

//const socket = io.connect("http://localhost:3001");
let socket;
const Dashboard = () => {
  const ENDPOINT = "http://localhost:3001";
  socket = io(ENDPOINT, {
    forceNew: true,
    origins: "http://localhost:3001",
  });

  useEffect(() => {
    const data = {
      room: "room2",
    };
    socket.emit("join_room", data, (error) => {
      if (error) {
        alert(error);
      }
    });
  });

  return (
    <div className="chatshell">
      <div className="chatshell_root">
        <ChatShell socket={socket} />
      </div>
    </div>
  );
};

export default Dashboard;
