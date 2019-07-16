import React, { Component } from "react";
import * as d3 from "d3";
import firebase from "../../../Firestore";

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
  }

  arcTweenEnter = (data, arc) => {
    let i = d3.interpolate(data.endAngle, data.startAngle);

    return t => {
      data.startAngle = i(t);
      return arc(data);
    };
  };

  render() {
    return (
      <div>
        <svg width={450} height={450} ref={"canvas"} />
      </div>
    );
  }
}

export default DonutChart;
