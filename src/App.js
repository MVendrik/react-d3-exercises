import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import DonutChart from "./containers/DonutChart/DonutChart";

function App() {
  return (
    <div>
      <Layout>
        <DonutChart />
      </Layout>
    </div>
  );
}

export default App;
