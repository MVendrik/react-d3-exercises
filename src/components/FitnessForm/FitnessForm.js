import React, { Component } from "react";
import "./FitnessForm.css";

class FitnessForm extends Component {
  state = {
    fitnessForm: {
      activity: "badminton",
      duration: 0,
      date: ""
    }
  };
  render() {
    return (
      <div className={"row"}>
        <form className={"col m6 push-m3"}>
          <p className={"flow-text grey-text center"}>
            How much <span>{this.props.currentActivity} </span> did you do
            today?
          </p>
          <input
            type="text"
            className={"grey-text"}
            id="cycling"
            placeholder="Duration in minutes"
          />
          <p className={"center pink-text error text-lighten-1"} id="error" />
        </form>
      </div>
    );
  }
}

export default FitnessForm;
