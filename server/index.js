require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.post("/suggest", async (req, res) => {
  try {
    const message = req.body.message;

    const completions = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful conversational assistant that suggests texts based on incoming messages.",
        },
        {
          role: "user",
          content: `Suggest a message to text back based on this text: ${message}`,
        },
      ],
    });
    res.json({ completions });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured while processing the message.");
  }
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
