import React from "react";
import "materialize-css/dist/css/materialize.min.css";

const header = () => (
  <React.Fragment>
    <header className={"indigo darken-1 section"}>
      <h2 className={"center white-text"}>Donut Chart</h2>
      <p className={"flow-text grey-text center text-lighten-2"}>
        My monthly money tracker
      </p>
    </header>
  </React.Fragment>
);

export default header;
