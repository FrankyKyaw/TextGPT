import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SuggestIcon from "./icons/SuggestIcon";
import SuggestBar from "./components/SuggestBar";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [suggestClicked, setSuggestClicked] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

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
    socket.on("receive_message", (data) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: data.message }),
      };

      const apiResponse = fetch("http://localhost:3001/suggest", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setSuggestions([]);
          setSuggestions((list) => [...list, {title: data.data}]);
        })
        .catch((error) => {
          console.error("Error fetching suggestion:", error);
        });
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const handleSuggestIconClick = () => {
    if (suggestClicked) {
      setSuggestClicked(false);
    } else {
      setSuggestClicked(true);
    }
  };

  const handleItemClick = (item) => {
    setCurrentMessage(item.title);  
    setSuggestClicked(false);
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
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
        </ScrollToBottom>
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
        <div className="suggest-icon">
          <button onClick={handleSuggestIconClick}>
            <SuggestIcon />
          </button>
        </div>

        <button onClick={sendMessage}>&#9658;</button>
      </div>
      {suggestClicked && <SuggestBar items={suggestions} onItemClick={handleItemClick}/>}
    </div>
  );
}

export default Chat;
