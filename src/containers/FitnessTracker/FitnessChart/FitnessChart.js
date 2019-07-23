import React, { Component } from "react";
import "./FitnessChart.css";
import * as d3 from "d3";
import firebase from "../../../Firestore";

class FitnessChart extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    let dataArray = [];

    const db = firebase.firestore();
    db.collection("activities").onSnapshot(res => {
      res.docChanges().forEach(change => {
        const doc = { ...change.doc.data(), id: change.doc.id };

        switch (change.type) {
          case "added":
            dataArray.push(doc);
            break;
          case "modified":
            const index = dataArray.findIndex(item => item.id === doc.id);
            dataArray[index] = doc;
            break;
          case "removed":
            dataArray = dataArray.filter(item => item.id !== doc.id);
            break;
          default:
            break;
        }
      });
      this.setState({ data: dataArray });
      this.drawChart();
    });
  }

  drawChart() {
    const margins = { top: 40, right: 20, bottom: 50, left: 100 };
    const graphWidth = 560 - margins.left - margins.right;
    const graphHeight = 400 - margins.top - margins.bottom;

    const graph = d3
      .select(this.refs.canvas)
      .append("g")
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${margins.left}, ${margins.top})`);
  }

  render() {
    return (
      <div className={"col s12 l6 ChartSection"}>
        <svg width={560} height={400} ref={"canvas"} />
      </div>
    );
  }
}

export default FitnessChart;
