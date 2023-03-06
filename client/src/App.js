import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { io } from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="">
      <h3>Join a chat</h3>
      <input
        className="border"
        type="text"
        placeholder="Name..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <input
        className="border"
        type="text"
        placeholder="Room ID..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      ></input>
      <button onClick={joinRoom}>Join a Room</button>
      </div>
      <Chat socket={socket} username={username} room={room}/>
    </div>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/chat" element={<Chat />} />
    //     <Route path='/' element={<Home/>}/>
    //   </Routes>
    // </BrowserRouter>
    // <div className="App">
    //   <h1 className="text-3xl font-bold underline">
    //   <button></button>
    // </h1>
    // </div>
  );
}

export default App;

// const [room, setRoom] = useState('');
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("join_room", room);
//     }
//   }
//   const sendMessage = () => {
//     socket.emit("send_message", { message, room });
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//     });
//   }, [socket]);
// <input
// onChange={(event) => {
//   setRoom(event.target.value);
// }}
// placeholder="Room Number..."
// />
// <button onClick={joinRoom}>Join Room</button>
// <input
// onChange={(event) => {
//   setMessage(event.target.value);
// }}
// placeholder="Message..."
// />
// <button onClick={sendMessage}>Send Message</button>
// <h1>Message: </h1>
// {messageReceived}
