import React from "react";
import Layout from "./components/Layout/Layout";
import SpendingTracker from "./containers/SpendingTracker/SpendingTracker";
import FitnessTracker from "./containers/FitnessTracker/FitnessTracker";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/fitnesstracker" component={FitnessTracker} />
          <Route path="/" exact component={SpendingTracker} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
