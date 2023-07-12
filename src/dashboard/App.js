import React from "react";
import io from "socket.io-client";
import ChatShell from "./containers/shell/ChatShell";

const socket = io.connect("http://localhost:3001");
// const ENDPOINT = "http://localhost:3001";
// const socket = io(ENDPOINT, {
//   forceNew: true,
//   origins: "http://localhost:3001",
// });
const Dashboard = () => {
  const data = {
    room: "room2",
  };
  socket.emit("join_room", data, (error) => {
    if (error) {
      alert(error);
    }
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
