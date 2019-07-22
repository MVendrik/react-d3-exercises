import React from "react";
import "./Buttons.css";

const button = props => (
  <button className={props.active} onClick={props.clicked}>
    {props.activity}
  </button>
);

export default button;
