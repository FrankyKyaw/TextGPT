import React from "react";

export default function Chat({ socket, username, room }) {
  return (
    <div>
      <div>Live Chat</div>
      <div className="h-20 border"></div>
      <div>
        <input className="border" type="text" placeholder="Hey..." />
        <button className="border">&#9658;</button>
      </div>
    </div>
  );
}
