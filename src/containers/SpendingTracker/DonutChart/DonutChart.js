import React, { Component } from "react";
import * as d3 from "d3";
import firebase from "../../../Firestore";
import { legendColor } from "d3-svg-legend";
import d3Tip from "d3-tip";
import "./DonutChart.css";

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

    // Add legend to group
    const legendGroup = d3
      .select(this.refs.legendGroup)
      .attr("transform", `translate(${dimensions.width + 40}, 10)`);

    const legend = legendColor()
      .shape("circle")
      .shapePadding(10)
      .scale(colours);

    legendGroup.call(legend);
    legendGroup.selectAll("text").attr("fill", "white");

    // Create tooltip
    const tip = d3Tip()
      .attr("class", "tip card Tip")
      .html(d => {
        return `${d.data.name} <br>
        ${d.data.cost}  <br> 
         Click to delete`;
      });

    graph.call(tip);

    // Create the mouseover, mouseout and click events for all paths
    graph
      .selectAll("path")
      .on("mouseover", (d, i, n) => {
        tip.show(d, n[i]);
        this.handleMouseOVer(d, i, n);
      })
      .on("mouseout", (d, i, n) => {
        this.handleMouseOut(d, i, n, colours);
        tip.hide();
      })
      .on("click", this.handleClick);
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

  handleClick = d => {
    const id = d.data.id;

    const db = firebase.firestore();
    db.collection("expenses")
      .doc(id)
      .delete();
  };

  render() {
    return (
      <div className={"col s12 m4 push-m2"}>
        <svg width={450} height={450} ref={"canvas"}>
          <g ref={"legendGroup"} />
        </svg>
      </div>
    );
  }
}

export default DonutChart;
