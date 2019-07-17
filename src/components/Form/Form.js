import React, { Component } from "react";
import firebase from "../../Firestore";

class Form extends Component {
  initialState = {
    dataForm: {
      name: {
        value: ""
      },
      cost: {
        value: ""
      }
    }
  };

  state = this.initialState;

  inputChangedHandler = (e, id) => {
    e.persist();
    const updatedDataForm = { ...this.state.dataForm };
    const updatedFormElement = { ...updatedDataForm[id] };
    updatedFormElement.value = e.target.value;
    updatedDataForm[id] = updatedFormElement;
    this.setState({ dataForm: updatedDataForm });
  };

  submitFormHandler = e => {
    e.preventDefault();

    const item = {
      name: this.state.dataForm.name.value,
      cost: this.state.dataForm.cost.value
    };

    const db = firebase.firestore();
    db.collection("expenses")
      .add(item)
      .then(res => {
        this.setState(() => this.initialState);
      });
  };

  render() {
    const classNames = "active";
    return (
      <div className={" indigo col s12 m4 push-m1"}>
        <form className={"card z-depth-0"} onSubmit={this.submitFormHandler}>
          <div className={"card-content"}>
            <span className={"card-title indigo-text"}>Add item:</span>
            <div className={"input-field"}>
              <input
                type="text"
                id="name"
                required
                value={this.state.dataForm.name.value}
                onChange={e => this.inputChangedHandler(e, "name")}
              />
              <label for="name" className={classNames}>
                Item name
              </label>
            </div>
            <div className={"input-field"}>
              <input
                type="number"
                id="cost"
                required
                value={this.state.dataForm.cost.value}
                onChange={e => this.inputChangedHandler(e, "cost")}
              />
              <label for="cost" className={classNames}>
                Item Cost ($)
              </label>
            </div>
            <div className={"input-field center"}>
              <button className={"btn-large pink white-text"}>Add Item</button>
            </div>
            <div className={"input-field center"}>
              <p className={"red-text"} id="error" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
