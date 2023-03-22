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
app.use(express.json());

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

    // const completion = await openai.createCompletion({
    //   model: "gpt-3.5-turbo",
    //   prompt: "Hi, how are you",
    //   temperature: 0.6,
    // });
    // const result = completion.data.choices[0].text;
    // res.status(200).json({ resu: result });

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
          content: `${message}`,
        },
      ],
    });
    // parse the response from OpenAI as json
    // console.log(completions.data.choices[0].message.content)

    // get the bot's answer from the OpenAI API response
    const botAnswer = completions?.data.choices?.[0]?.message?.content

    // create the bot message object
    const botMessage = { role: "assistant", content: botAnswer };

    // store bot message in global message state
    console.log(botMessage)

    // send the bot's answer back to the client
    return res.json({ data: botAnswer });

  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
