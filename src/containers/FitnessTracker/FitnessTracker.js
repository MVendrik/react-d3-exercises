import React, { Component } from "react";
import Header from "../../components/Header/Header";
import "./FitnessTracker.css";
import Button from "../../components/Buttons/Button";
import FitnessChart from "./FitnessChart/FitnessChart";
import FitnessForm from "../../components/FitnessForm/FitnessForm";

class FitnessTracker extends Component {
  state = {
    currentActivity: "badminton"
  };

  handleButtonClick = activity => {
    console.log(activity);
    this.setState({ currentActivity: activity });
  };

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
        <div className={"row"}>
          <div className={"col s12 l5  ButtonSection"}>
            <Button
              active={"active"}
              activity={"Badminton"}
              clicked={activity => this.handleButtonClick("badminton")}
            />
            <Button
              activity={"Boxing"}
              clicked={activity => this.handleButtonClick("boxing")}
            />
            <Button
              activity={"Gym"}
              clicked={activity => this.handleButtonClick("gym")}
            />
            <Button
              activity={"Walking"}
              clicked={activity => this.handleButtonClick("walking")}
            />
          </div>
          <FitnessChart />
        </div>
        <FitnessForm currentActivity={this.state.currentActivity} />
      </div>
    );
  }
}

export default FitnessTracker;
