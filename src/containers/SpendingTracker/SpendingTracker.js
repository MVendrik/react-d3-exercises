import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import "./SpendingTracker.css";
import DonutChart from "./DonutChart/DonutChart";

class SpendingTracker extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className={"ContentDonutChart row indigo"}>
          <Form />
          <DonutChart />
        </div>
      </React.Fragment>
    );
  }
}

export default SpendingTracker;
