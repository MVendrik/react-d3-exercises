import React, { Component } from "react";
import "./FitnessChart.css";
import * as d3 from "d3";
import firebase from "../../../Firestore";

class FitnessChart extends Component {
  state = {
    data: [],
    currentActivity: "badminton"
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

  componentDidUpdate() {
    if (this.state.currentActivity !== this.props.currentActivity) {
      this.setState({ currentActivity: this.props.currentActivity });
    }
    this.drawChart();
  }

  drawChart() {
    const margins = { top: 40, right: 20, bottom: 50, left: 100 };
    const graphWidth = 600 - margins.left - margins.right;
    const graphHeight = 400 - margins.top - margins.bottom;

    const currentData = this.state.data.filter(
      item => item.activity === this.state.currentActivity
    );

    currentData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const graph = d3
      .select(this.refs.canvas)
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${margins.left}, ${margins.top})`);

    // set up for axes
    const x = d3.scaleTime().range([0, graphWidth]);
    const y = d3.scaleLinear().range([graphHeight, 0]);

    const xAxisGroup = d3
      .select(this.refs.xAxisG)
      .attr("transform", `translate(0, ${graphHeight})`);

    const yAxisGroup = d3.select(this.refs.yAxisG);

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

    // create, update and remove circles for data points
    const circles = graph.selectAll("circle").data(currentData);

    circles.exit().remove();

    circles.attr("cx", d => x(new Date(d.date))).attr("cy", d => y(d.duration));

    circles
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", d => x(new Date(d.date)))
      .attr("cy", d => y(d.duration))
      .attr("fill", "#ccc");

    // Add the line path generator
    const line = d3
      .line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.duration));

    const path = d3.select(this.refs.line);

    path
      .data([currentData])
      .attr("fill", "none")
      .attr("stroke", "#00bfa5")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add dotted lines
    const dottedLines = d3.select(this.refs.dottedLines).style("opacity", 0);

    const xDottedLine = d3
      .select(this.refs.xDottedLine)
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);

    const yDottedLine = d3
      .select(this.refs.yDottedLine)
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);

    // Add mouseover and mouseout events + show dottedlines
    graph
      .selectAll("circle")
      .on("mouseover", (d, i, n) => {
        d3.select(n[i])
          .transition()
          .duration(100)
          .attr("r", 8)
          .attr("fill", "#fff");

        xDottedLine
          .attr("x1", x(new Date(d.date)))
          .attr("x2", x(new Date(d.date)))
          .attr("y1", graphHeight)
          .attr("y2", y(d.duration));

        yDottedLine
          .attr("x1", 0)
          .attr("x2", x(new Date(d.date)))
          .attr("y1", y(d.duration))
          .attr("y2", y(d.duration));

        dottedLines.style("opacity", 1);
      })
      .on("mouseleave", (d, i, n) => {
        d3.select(n[i])
          .transition()
          .duration(100)
          .attr("r", 4)
          .attr("fill", "#ccc");
        dottedLines.style("opacity", 0);
      });
  }

  render() {
    return (
      <div className={"col s12 m12 l5 push-l1 ChartSection"}>
        <svg width={600} height={400}>
          <g ref={"canvas"}>
            <path ref={"line"} />
            <g ref={"dottedLines"} className={"lines"}>
              <line ref={"xDottedLine"} />
              <line ref={"yDottedLine"} />
            </g>
            <g className={"x-axis"} ref={"xAxisG"} />
            <g className={"y-axis"} ref={"yAxisG"} />
          </g>
        </svg>
      </div>
    );
  }
}

export default FitnessChart;
