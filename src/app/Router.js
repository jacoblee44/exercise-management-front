import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/login";

//Layouts
import Header from "../pages/header";

import Pages from "./Pages";

const Router = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Login} />
    <Route path="/" component={wrappedRoutes} />
  </Switch>
);

const wrappedRoutes = () => {
  return (
    <div>
      <Header />
      <div className="plat-content">
        <Route path="/" component={Pages} />
      </div>
    </div>
  );
};

export default Router;
