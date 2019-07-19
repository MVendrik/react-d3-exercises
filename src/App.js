import React from "react";
import Layout from "./components/Layout/Layout";
import SpendingTracker from "./containers/SpendingTracker/SpendingTracker";

function App() {
  return (
    <div>
      <Layout>
        <SpendingTracker />
      </Layout>
    </div>
  );
}

export default App;
