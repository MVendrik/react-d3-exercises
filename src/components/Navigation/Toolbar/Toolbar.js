import React from "react";
import "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = () => (
  <header className={"Toolbar"}>
    <div>MY D3 PROJECTS</div>
    <NavigationItems />
  </header>
);

export default toolbar;
