import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Client from "./client";
import Dashboard from "./dashboard/App";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Client} />
      <Route path="/dashboard" component={Dashboard} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
