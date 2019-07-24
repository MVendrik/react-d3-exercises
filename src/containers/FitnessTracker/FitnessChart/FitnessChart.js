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
    const graphWidth = 600 - margins.left - margins.right;
    const graphHeight = 400 - margins.top - margins.bottom;

    const graph = d3
      .select(this.refs.canvas)
      .append("g")
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${margins.left}, ${margins.top})`);

    // set up for axes
    const x = d3.scaleTime().range([0, graphWidth]);
    const y = d3.scaleLinear().range([graphHeight, 0]);

    const xAxisGroup = graph
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${graphHeight})`);

    const yAxisGroup = graph.append("g").attr("class", "y-axis");

    x.domain(d3.extent(this.state.data, d => new Date(d.date)));
    y.domain([0, d3.max(this.state.data, d => d.duration)]);

    const xAxis = d3
      .axisBottom(x)
      .ticks(4)
      .tickFormat(d3.timeFormat("%b %d"));
    const yAxis = d3
      .axisLeft(y)
      .ticks(4)
      .tickFormat(d => d + " m");

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .attr("text-anchor", "end");
  }

  render() {
    return (
      <div className={"col s12 l5 push-l1 ChartSection"}>
        <svg width={600} height={400} ref={"canvas"} />
      </div>
    );
  }
}

export default FitnessChart;
