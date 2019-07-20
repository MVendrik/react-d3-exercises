import React from "react";
import "./NavigationItems.css";

const navigationItems = props => (
  <ul className={"NavigationItems"}>
    <li>
      <a className={"active"} href="/">
        Donut Chart
      </a>
    </li>
    <li>
      <a href="/">Fitness chart</a>
    </li>
  </ul>
);

export default navigationItems;