import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.once("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log("receive_message triggered:", data);
      return;
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent, index) => {
          return (
            <div
              key={index}
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;

// import React from "react";
// import { useState, useEffect } from "react";

// export default function Chat({ socket, username, room }) {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);

//   const sendMessage = async () => {
//     if (currentMessage !== "") {
//       const messageData = {
//         room: room,
//         author: username,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes() +
//           ":" +
//           new Date(Date.now()).getSeconds(),
//       };

//       await socket.emit("send_message", messageData);

//       setMessageList(prevState => [...prevState, messageData]);
//       setCurrentMessage("");
//     }
//   };

//   useEffect(() => {

//     socket.on("receive_message", (data) => {
//       setMessageList((list) => [...list, data]);
//       console.log(messageList)
//     });
//   }, []);

//   return (
//     <div className="bg-gray-700 text-white p-4 rounded-md">
//       <div>Live Chat</div>
//       <div className="h-60">
//         {messageList.map((messageContent, index) => {
//           return (
//             <div
//               key={index}
//               className={`flex w-auto max-w-xs px-4 py-1 rounded-lg ${
//                 username === messageContent.author
//                   ? "bg-blue-400 justify-end text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               <div>
//                 <div className="inline-block max-w-xs bg-blue-400 px-4 py-1 rounded-lg text-white">
//                   <p>{messageContent.message}</p>
//                 </div>
//                 <div>
//                   <p id="time">{messageContent.time}</p>
//                   <p id="author">{messageContent.author}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={currentMessage}
//           onChange={(event) => {
//             setCurrentMessage(event.target.value);
//           }}
//           placeholder="Write your message!"
//           className="focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 py-3"
//           onKeyPress={(event) => {
//             event.key === "Enter" && sendMessage();
//           }}
//         />
//         <button
//           type="button"
//           onClick={sendMessage}
//           className="inline-flex items-center justify-center  px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
//         >
//           <span class="font-bold">Send</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             className="h-6 w-6 ml-2 transform rotate-90"
//           >
//             <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }
