import React, { Component } from "react";
import "./Layout.css";

class Layout extends Component {
  render() {
    return (
      <div>
        <div>The toolbar</div>
        <main className={"Content"}>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
