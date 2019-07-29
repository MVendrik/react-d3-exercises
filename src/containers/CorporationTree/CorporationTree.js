import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { Add } from "@material-ui/icons";
import Modal from "../../components/Modal/Modal";

class CorporationTree extends Component {
  state = {
    modalShow: false
  };

  buttonClickedHandler = () => {
    this.setState({ modalShow: true });
  };

  closeModalHandler = () => {
    this.setState({ modalShow: false });
  };

  render() {
    let modal =
      this.state.modalShow === true ? (
        <Modal
          show={this.state.modalShow}
          modalClosed={this.closeModalHandler}
          submitted={this.closeModalHandler}
        />
      ) : null;
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
        <button
          href="/"
          className={"btn-floating btn-large halfway-fab pink modal-trigger"}
          style={{ top: 200, right: 20, cursor: "pointer" }}
          onClick={this.buttonClickedHandler}
        >
          <i>
            <Add />
          </i>
        </button>

        {modal}

        <div>Tree diagram</div>
      </div>
    );
  }
}

export default CorporationTree;
