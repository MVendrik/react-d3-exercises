import React, { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "../../components/Modal/Modal.css";
import firebase from "../../Firestore";

class Modal extends Component {
  state = {
    employeeForm: {
      name: "",
      parent: "",
      department: ""
    }
  };

  inputChangedHandler = (e, id) => {
    e.persist();
    const updatedForm = { ...this.state.employeeForm };
    let updatedValue = updatedForm.id;
    updatedValue = e.target.value;
    updatedForm[id] = updatedValue;
    this.setState({ employeeForm: updatedForm });
  };

  submitFormHandler = e => {
    e.preventDefault();
    const item = {
      name: this.state.employeeForm.name,
      parent: this.state.employeeForm.parent,
      department: this.state.employeeForm.department
    };

    const db = firebase.firestore();
    db.collection("employees").add(item);
    this.props.modalClosed();
  };

  render() {
    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={"Modal center"} ref={"Modal"}>
          <div className={"modal-content"}>
            <h4 className={"pink-text center"}>Add new Employee</h4>
            <form onSubmit={e => this.submitFormHandler(e)}>
              <div className={"input-field"}>
                <input
                  type="text"
                  placeholder="Employee name"
                  onChange={e => this.inputChangedHandler(e, "name")}
                />
              </div>
              <div className={"input-field"}>
                <input
                  type="text"
                  placeholder="Reports to..."
                  onChange={e => this.inputChangedHandler(e, "parent")}
                />
              </div>
              <div className={"input-field"}>
                <input
                  type="text"
                  placeholder="Department"
                  onChange={e => this.inputChangedHandler(e, "department")}
                />
              </div>
              <div>
                <button className={"btn pink white-text center"}>
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
