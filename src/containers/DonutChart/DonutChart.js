import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import "./DonutChart.css";

class DonutChart extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className={"indigo MainContent"}>
          <Form />
          <div />
        </div>
      </React.Fragment>
    );
  }
}

export default DonutChart;
