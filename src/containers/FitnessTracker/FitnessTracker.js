import React, { Component } from "react";
import Header from "../../components/Header/Header";
import "./FitnessTracker.css";

class FitnessTracker extends Component {
  render() {
    return (
      <div className={"grey darken-4 FitnessChartFullPage"}>
        <Header
          headerClasses={"headerFitness section z-depth-0"}
          h2Classes={"center white-text Header"}
          h2Text={"Fitness Chart"}
          pClasses={"flow-text grey-text center text-lighten-2"}
          pText={"My daily exercise"}
        />
        <div>Buttons</div>
        <div>The chart</div>
      </div>
    );
  }
}

export default FitnessTracker;
