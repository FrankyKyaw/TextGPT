import React from "react";
import "./SuggestBar.css";

export default function SuggestBar(props) {
  return (
    <div className="suggest-container">
      <ul className="suggest-list">
        {props.items.map((item, index) => (
          <li className="suggest-list-item" key={index} onClick={() => props.onItemClick(item)}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
