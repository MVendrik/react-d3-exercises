import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import "./SpendingTracker.css";
import DonutChart from "./DonutChart/DonutChart";

class SpendingTracker extends Component {
  render() {
    return (
      <React.Fragment>
        <Header
          headerClasses={"indigo darken-1 section "}
          h2Classes={"center white-text Header"}
          h2Text={"Donut Chart"}
          pClasses={"flow-text grey-text center text-lighten-2"}
          pText={"My monthly money tracker"}
        />
        <div className={"ContentDonutChart row indigo"}>
          <Form />
          <DonutChart />
        </div>
      </React.Fragment>
    );
  }
}

export default SpendingTracker;
