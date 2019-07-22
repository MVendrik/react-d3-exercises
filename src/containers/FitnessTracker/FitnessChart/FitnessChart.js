import React, { Component } from "react";
import "./FitnessChart.css";

class FitnessChart extends Component {
  state = {};
  render() {
    return (
      <div className={"col s12 l6 ChartSection"}>
        <svg width={560} height={400} ref={"canvas"} />
      </div>
    );
  }
}

export default FitnessChart;
