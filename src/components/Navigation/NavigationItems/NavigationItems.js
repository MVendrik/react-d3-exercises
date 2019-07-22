import React from "react";
import "./NavigationItems.css";
import { NavLink } from "react-router-dom";
//import SpendingTracker from "../../../containers/SpendingTracker/SpendingTracker";
//import FitnessTracker from "../../../containers/FitnessTracker/FitnessTracker";

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
  </ul>
);

export default navigationItems;
