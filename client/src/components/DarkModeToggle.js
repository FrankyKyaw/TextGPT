import React from "react";
import "./DarkModeToggle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function DarkModeToggle(props) {
    
  return (
    <>
      <input type="checkbox" class="checkbox" id="checkbox" onChange={props.handleToggle}/>
      <label for="checkbox" class="label">
        <FontAwesomeIcon icon={faMoon} />
        <FontAwesomeIcon icon={faSun} />
        <div class="ball"></div>
      </label>
    </>
  );
}
