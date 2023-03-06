import React from "react";
import Board from "../board/Board";

export default function Container(props) {
    return (
        <div className="container">
            <div className="color-picker">
                <input type="color"/>
            </div>
            <div class="board-container">
                <Board></Board>
            </div>
        </div>
    )
}