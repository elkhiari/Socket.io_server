const express = require("express");
const app = express();
const cors = require("cors");
const conectDB = require("./db/config.db");
const Http = require("http").createServer(app);
const io = require("socket.io")(Http, {
  cors: {
    origin: "*",
  },
});
require("dotenv").config();
const port = process.env.PORT || 3001;
const {
  storeMessage,
  getMessages,
} = require("./controllers/message.controller");
const {
  storeUser,
  deleteUser,
  getUsers,
  checkUser,
  getUser,
  updateUser,
} = require("./controllers/user.controller");
const AvatarRouter = require("./routes/avatar.routes");

app.use(cors());
app.use(express.json());
app.use("/avatars", AvatarRouter);
app.get("/users/:username", getUser);

io.on("connection", async (socket) => {
  socket.on("join", async ({ username }) => {
    if (checkUser(username)) {
      updateUser(username, socket.id)
        .then(async () => {
          const messages = await getMessages();
          socket.emit("messages", messages);
          const users = await getUsers();
          io.emit("users", users);
        })
        .catch(async (error) => {
          socket.emit("message", {
            username: "bot",
            text: error.message,
          });
          const messages = await getMessages();
          socket.emit("messages", messages);
          const users = await getUsers();
          io.emit("users", users);
        });
    } else {
      storeUser(username, socket.id)
        .then(async (user) => {
          socket.broadcast.emit("message", {
            username: "bot",
            text: `${username} has joined the chat`,
          });
          const messages = await getMessages();
          socket.emit("messages", messages);
          const users = await getUsers();
          io.emit("users", users);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  socket.on("send_message", async (message) => {
    const { username, text } = message;
    const newMessage = await storeMessage({ username, text });
    socket.broadcast.emit("message", newMessage);
  });

  socket.on("disconnect", async () => {
    await deleteUser(socket.id);
    io.emit("message", {
      username: "bot",
      text: "A user has left the chat",
    });
  });
});

const connect = async () => {
  try {
    await conectDB(process.env.ATLAS_URI);
    Http.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connect();
