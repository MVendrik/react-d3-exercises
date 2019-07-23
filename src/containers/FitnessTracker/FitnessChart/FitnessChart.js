import React, { Component } from "react";
import "./FitnessChart.css";
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
    });
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
