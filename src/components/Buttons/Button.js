import React from "react";
import "./Buttons.css";

const button = props => (
  <button className={props.active}>{props.activity}</button>
);

export default button;
