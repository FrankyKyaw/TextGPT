import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;






















// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Chat from "./Chat";
// import Home from "./pages/Home";
// import { io } from "socket.io-client";
// import { useState } from "react";

// const socket = io.connect("http://localhost:3001");

// function App() {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");
//   const [showChat, setShowChat] = useState(false);

//   const joinRoom = () => {
//     if (username !== "" && room !== "") {
//       socket.emit("join_room", room);
//       setShowChat(true);
//     }
//   };

//   return (
//     <div className="flex flex-col pt-32 w-full items-center h-screen bg-gray-800">
//       {!showChat ? (
//         <div className="block rounded-lg bg-white p-10">
//           <h3 className="flex justify-center">Join a chat</h3>
//           <div className="flex space-x-3 p-4">
//             <input
//               className="border p-3"
//               type="text"
//               placeholder="Name..."
//               onChange={(event) => {
//                 setUsername(event.target.value);
//               }}
//             />
//             <input
//               className="border p-3"
//               type="text"
//               placeholder="Room ID..."
//               onChange={(event) => {
//                 setRoom(event.target.value);
//               }}
//             />
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               onClick={joinRoom}
//             >
//               Join a Room
//             </button>
//           </div>
//         </div>
//       ) : (
//         <Chat socket={socket} username={username} room={room} />
//       )}
//     </div>

//     // <BrowserRouter>
//     //   <Routes>
//     //     <Route path="/register" element={<Register />} />
//     //     <Route path="/login" element={<Login />} />
//     //     <Route path="/chat" element={<Chat />} />
//     //     <Route path='/' element={<Home/>}/>
//     //   </Routes>
//     // </BrowserRouter>
//     // <div className="App">
//     //   <h1 className="text-3xl font-bold underline">
//     //   <button></button>
//     // </h1>
//     // </div>
//   );
// }

// export default App;

// // const [room, setRoom] = useState('');
// //   const [message, setMessage] = useState("");
// //   const [messageReceived, setMessageReceived] = useState("");

// //   const joinRoom = () => {
// //     if (room !== "") {
// //       socket.emit("join_room", room);
// //     }
// //   }
// //   const sendMessage = () => {
// //     socket.emit("send_message", { message, room });
// //   };

// //   useEffect(() => {
// //     socket.on("receive_message", (data) => {
// //       setMessageReceived(data.message);
// //     });
// //   }, [socket]);
// // <input
// // onChange={(event) => {
// //   setRoom(event.target.value);
// // }}
// // placeholder="Room Number..."
// // />
// // <button onClick={joinRoom}>Join Room</button>
// // <input
// // onChange={(event) => {
// //   setMessage(event.target.value);
// // }}
// // placeholder="Message..."
// // />
// // <button onClick={sendMessage}>Send Message</button>
// // <h1>Message: </h1>
// // {messageReceived}
