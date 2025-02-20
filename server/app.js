import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { errorMiddleware } from "./middlewares/error.js";
import adminRoute from "./routes/admin.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

dotenv.config({
  path: "./.env",
});
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3001;
export const envMode = process.env.NODE_ENV || "PRODUCTION";

export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "asdfasdf";

const userSocketIDs = new Map();
connectDB(mongoURI);
const app = express();

const server = createServer(app);
const io = new Server(server, {});

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);

app.use("/api/v1/chat", chatRoute);

app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);



io.on("connection", (socket) => {
  const user = {
    _id: "asdasd",
    name: "Nameoo",
  };
  userSocketIDs.set(user._id.toString(), socket.id);

  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async (chatId, members, message) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },

      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });
    
    try {
      await Message.create(messageForDB);
    }catch (error) {
      console.log(error);
    }
   


  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    userSocketIDs.delete(user._id.toString());
  });
});

server.listen(port, () => {
  console.log(`Server Is Running in ${port} in ${envMode} Mode`);
});

export { userSocketIDs };
