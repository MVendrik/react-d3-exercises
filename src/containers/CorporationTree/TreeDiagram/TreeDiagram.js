import React, { Component } from "react";
import firebase from "../../../Firestore";
import * as d3 from "d3";

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

    const graph = d3
      .select(this.refs.graph)
      .attr("transform", "translate(50, 50)");

    const stratify = d3
      .stratify()
      .id(d => d.name)
      .parentId(d => d.parent);

    const rootNode = stratify(this.state.data);

    const tree = d3.tree().size([dims.width, dims.height]);

    const treeData = tree(rootNode);

    const nodes = graph.selectAll(".nodes").data(treeData.descendants());
    console.log(nodes);
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
