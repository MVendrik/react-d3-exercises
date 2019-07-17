import React, { Component } from "react";
import * as d3 from "d3";
import firebase from "../../../Firestore";
import { legendColor } from "d3-svg-legend";

class DonutChart extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const db = firebase.firestore();
    let dataArray = [];
    db.collection("expenses").onSnapshot(res => {
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
      this.drawchart();
    });
  }

  drawchart() {
    const dimensions = { height: 300, width: 300, radius: 150 };
    const center = {
      x: dimensions.width / 2 + 5,
      y: dimensions.height / 2 + 5
    };

    const colours = d3.scaleOrdinal(d3["schemeSet2"]);
    colours.domain(this.state.data.map(d => d.name));

    const graph = d3
      .select(this.refs.canvas)
      .append("g")
      .attr("transform", `translate(${center.x}, ${center.y})`);

    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.cost);

    const arcPath = d3
      .arc()
      .outerRadius(dimensions.radius)
      .innerRadius(dimensions.radius / 2);

    const paths = graph.selectAll("path").data(pie(this.state.data));

    paths.exit().remove();

    paths.attr("d", arcPath);

    paths
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .attr("fill", d => colours(d.data.name))
      .transition()
      .duration(750)
      .attrTween("d", d => this.arcTweenEnter(d, arcPath));

    // create the legend
    const legendGroup = d3
      .select(this.refs.canvas)
      .append("g")
      .attr("transform", `translate(${dimensions.width + 40}, 10)`);

    const legend = legendColor()
      .shape("circle")
      .shapePadding(10)
      .scale(colours);

    legendGroup.call(legend);
    legendGroup.selectAll("text").attr("fill", "white");

    // create the mouseover and mouseout events for all paths
    graph
      .selectAll("path")
      .on("mouseover", this.handleMouseOVer)
      .on("mouseout", (d, i, n) => this.handleMouseOut(d, i, n, colours));
  }

  arcTweenEnter = (data, arc) => {
    let i = d3.interpolate(data.endAngle, data.startAngle);

    return t => {
      data.startAngle = i(t);
      return arc(data);
    };
  };

  handleMouseOVer = (d, i, n) => {
    d3.select(n[i])
      .transition("changeSliceFill")
      .duration(300)
      .attr("fill", "#fff");
  };

  handleMouseOut = (d, i, n, colours) => {
    d3.select(n[i])
      .transition("changeSliceFill")
      .duration(300)
      .attr("fill", colours(d.data.name));
  };

  render() {
    return (
      <div className={"col s12 m4 push-m2"}>
        <svg width={450} height={450} ref={"canvas"} />
      </div>
    );
  }
}

export default DonutChart;
