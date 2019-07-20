import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./Header.css";

const header = props => (
  <React.Fragment>
    <header className={props.headerClasses}>
      <h2 className={props.h2Classes}>{props.h2Text}</h2>
      <p className={props.pClasses}>{props.pText}</p>
    </header>
  </React.Fragment>
);

export default header;
