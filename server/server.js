import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import conversationRoutes from "./routes/conversations.js";
import messagesRoutes from "./routes/messages.js";
import http from "http";
import { Server } from "socket.io";
import Users from "./users.js";
const app = express();
app.use(cors());
const server = http.createServer(app);
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messagesRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "build")));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

const io = new Server(server, {
  cors: {
    origin: "http://167.172.160.113/",
    methods: ["GET", "POST"],
  },
});
let users = new Users();
io.on("connection", (socket) => {
  console.log("check 1", socket.connected);
  socket.on("join_room", (data, callback) => {
    const { error, user } = users.addUser(data.id, data.name, data.room);
    console.log(user);
    if (error) return callback(error);
    socket.emit("message", {
      id: user.id,
      text: `${user.name},
              Welcome to the Chatroom. How may we be of help?`,
    });

    socket.join(user.room);
    console.log(`User with ID: ${socket.id} joined room: ${user.room}`);
    socket.to("room2").emit("roomData", {
      room: user.room,
      users: users.getUsersInRoom(user.room),
      text: `Have joined the chatroom.`,
    });
    callback();
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    const user = users.removeUser(socket.id);
    if (user) {
      socket.to(user.room).emit("admin_message", {
        user: "admin",
        text: `${user.name} had left`,
      });
    }
  });
});

server.listen(3001, () => {
  connect();

  console.log("Server running on port 3001");
});
