const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const app = express();
// require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id ${socket.id} is in room ${data}`)
  })
  
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});


server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

// const server = app.listen(process.env.PORT, () => {
//   console.log(`Server started on Port ${process.env.PORT}`);
// });

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log("DB Connection Successful!");
// }).catch((err) => {
//   console.log(err);
// }).finally(() => {
//   console.log('finally')
// })
