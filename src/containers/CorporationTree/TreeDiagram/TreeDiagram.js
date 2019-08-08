import React, { Component } from "react";
import firebase from "../../../Firestore";
import * as d3 from "d3";
import "./TreeDiagram.css";

class TreeDiagram extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    let dataArray = [];

    const db = firebase.firestore();
    db.collection("employees").onSnapshot(res => {
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
      this.drawDiagram();
    });
  }

  drawDiagram() {
    const dims = { height: 500, width: 1100 };

    // create the ordinal scale
    const colours = d3.scaleOrdinal([
      "#f4511e",
      "#e91e63",
      "#e53935",
      "#9c27b0"
    ]);
    colours.domain(this.state.data.map(item => item.department));

    const graph = d3
      .select(this.refs.graph)
      .attr("transform", "translate(50, 50)");

    const stratify = d3
      .stratify()
      .id(d => d.name)
      .parentId(d => d.parent);

    // remove old nodes and links when data is added
    graph.selectAll(".node").remove();
    graph.selectAll(".link").remove();

    const rootNode = stratify(this.state.data);

    const tree = d3.tree().size([dims.width, dims.height]);

    const treeData = tree(rootNode);

    const nodes = graph.selectAll(".nodes").data(treeData.descendants());

    // Add the links
    const links = graph.selectAll(".link").data(treeData.links());

    links
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .linkVertical()
          .x(d => d.x)
          .y(d => d.y)
      );

    const enterNodes = nodes
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    enterNodes
      .append("rect")
      .attr("fill", d => colours(d.data.department))
      .attr("stroke", "#555")
      .attr("stroke-width", 2)
      .attr("height", 50)
      .attr("width", d => d.data.name.length * 15)
      .attr("transform", (d, i, n) => {
        let x = d.data.name.length * 7.5;
        return `translate(${-x}, -25)`;
      });

    enterNodes
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "white")
      .text(d => d.data.name);
  }

  render() {
    return (
      <div>
        <svg height={600} width={1200}>
          <g ref={"graph"} />
        </svg>
      </div>
    );
  }
}

export default TreeDiagram;
