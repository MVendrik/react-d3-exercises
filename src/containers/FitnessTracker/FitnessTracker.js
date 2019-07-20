import React, { Component } from "react";
import Header from "../../components/Header/Header";

class FitnessTracker extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header
          headerClasses={"grey darken-4 section z-depth-0"}
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
