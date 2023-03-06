import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
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
