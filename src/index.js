import React from "react";
import App from "./app/App";
import StudentApp from "./app/StudentApp";

import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./app/store";
import Login from "./pages/login";
import PrivateRoute from "./pages/login/PrivateRoute";
import StudentPrivateRoute from "./pages/student/PrivateRoute";
import StudentLogin from "./pages/student/Login";

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/student/:exercise/login" component={StudentLogin} />
        <StudentPrivateRoute path="/student/:exercise" component={StudentApp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
