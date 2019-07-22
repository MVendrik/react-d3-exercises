import React, { Component } from "react";

class FitnessForm extends Component {
  state = {};
  render() {
    return (
      <div className={"row"}>
        <form className={"col m6 push-m3"}>
          <p className={"flow-text grey-text center"}>
            How much ...{this.props.activty} did you do today?
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
