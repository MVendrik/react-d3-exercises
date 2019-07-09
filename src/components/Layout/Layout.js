import React, { Component } from "react";
import "./Layout.css";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <div>The toolbar</div>
        <main className={"Content"}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
