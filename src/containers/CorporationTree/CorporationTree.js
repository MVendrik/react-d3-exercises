import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { Add } from "@material-ui/icons";

class CorporationTree extends Component {
  state = {};
  render() {
    return (
      <div className={"CorpTreeFullPage"}>
        <Header
          headerClasses={"pink section headerTree"}
          h2Classes={"white-text center Header"}
          h2Text={"Tree Diagram"}
          pClasses={
            "grey lighten-3 section grey-text flow-text center headerTreeText"
          }
          pText={"My company's organizational structure"}
        />
        <a
          href={"#modal"}
          className={"btn-floating btn-large halfway-fab pink"}
        >
          <i>
            <Add />
          </i>
        </a>

        <div>Modal</div>
        <div>Tree diagram</div>
      </div>
    );
  }
}

export default CorporationTree;
