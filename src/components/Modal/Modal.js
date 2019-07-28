import React, { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "../../components/Modal/Modal.css";

class Modal extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={"Modal center"}>
          <div className={"modal-content"}>
            <h4 className={"pink-text center"}>Add new Employee</h4>
            <form>
              <div className={"input-field"}>
                <input type="text" id="name" placeholder="Employee name" />
              </div>
              <div className={"input-field"}>
                <input type="text" id="parent" placeholder="Reports to..." />
              </div>
              <div className={"input-field"}>
                <input type="text" id="department" placeholder="Department" />
              </div>
              <div>
                <button className={"btn pink white-text center"}>
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
