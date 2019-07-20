import React, { Component } from "react";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

class Layout extends Component {
  render() {
    return (
      <div className={"MainContent"}>
        <Toolbar />
        <div className={"Charts"}>{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
