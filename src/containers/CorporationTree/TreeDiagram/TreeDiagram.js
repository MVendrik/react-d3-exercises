import React, { Component } from "react";
import firebase from "../../../Firestore";

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
      console.log(this.state.data);
    });
  }

  render() {
    return (
      <div>
        <svg height={600} width={1200}>
          <g />
        </svg>
      </div>
    );
  }
}

export default TreeDiagram;
