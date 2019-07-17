import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import SpendingTracker from "./containers/SpendingTracker/SpendingTracker";

function App() {
  return (
    <div className={"Content"}>
      <Layout>
        <SpendingTracker />
      </Layout>
    </div>
  );
}

export default App;
