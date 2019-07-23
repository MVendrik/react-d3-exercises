import React, { Component } from "react";
import "./FitnessForm.css";
import firebase from "../../Firestore";

class FitnessForm extends Component {
  state = {
    duration: "",
    error: ""
  };

  inputChangedHandler = e => {
    this.setState({ duration: e.target.value });
  };

  submitFormHandler = e => {
    e.preventDefault();

    const duration = parseInt(this.state.duration);

    const db = firebase.firestore();
    if (duration >= 0)
      db.collection("activities")
        .add({
          duration,
          activity: this.props.currentActivity,
          date: new Date().toString()
        })
        .then(
          this.setState({
            duration: "",
            error: ""
          })
        );
    else {
      this.setState({ error: "Please enter a valid number." });
    }
  };

  render() {
    return (
      <div className={"row"}>
        <form
          className={"col m6 push-m3"}
          onSubmit={e => this.submitFormHandler(e)}
        >
          <p className={"flow-text grey-text center"}>
            How much <span>{this.props.currentActivity} </span> did you do
            today?
          </p>
          <input
            type="number"
            className={"grey-text"}
            placeholder="Duration in minutes"
            value={this.state.duration}
            onChange={e => this.inputChangedHandler(e)}
          />
          <p className={"center pink-text error text-lighten-1"}>
            {this.state.error}
          </p>
        </form>
      </div>
    );
  }
}

export default FitnessForm;
