import React, { Component } from "react";
import * as d3 from "d3";

class DonutChart extends Component {
  state = {
    data: [
      { name: "rent", cost: 500 },
      { name: "bills", cost: 200 },
      { name: "snacks", cost: 100 }
    ]
  };

  componentDidMount() {
    this.drawchart();
  }

  drawchart() {
    const dimensions = { height: 300, width: 300, radius: 150 };
    const center = {
      x: dimensions.width / 2 + 5,
      y: dimensions.height / 2 + 5
    };

    const colours = d3.scaleOrdinal(d3["schemeSet2"]);
    colours.domain(this.state.data.map(d => d.name));

    const svg = d3
      .select(this.refs.Canvas)
      .append("svg")
      .attr("width", dimensions.width + 150)
      .attr("height", dimensions.height + 150);

    const graph = svg
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
    return <div ref={"Canvas"} />;
  }
}

export default DonutChart;
