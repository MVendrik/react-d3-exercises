import React from "react";
import "./NavigationItems.css";
import { NavLink } from "react-router-dom";

const navigationItems = () => (
  <ul className={"NavigationItems"}>
    <li>
      <NavLink to={"/"} exact>
        Donut Chart
      </NavLink>
    </li>
    <li>
      <NavLink to={"/fitnesstracker"}>Fitness chart</NavLink>
    </li>
    <li>
      <NavLink to={"/corporationtree"}>Tree diagram</NavLink>
    </li>
  </ul>
);

export default navigationItems;
