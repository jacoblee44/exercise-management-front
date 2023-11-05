import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import StudentLogin from "../pages/student/Login";

import {
  CreateExercise,
  EditExercise,
  Dashboard,
  ViewExercise
} from "../pages/exercise";

import StudentExercise from "../pages/student/Exercise";

class Pages extends Component {
  render() {
    return (
      <div className="content">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/create-exercise" component={CreateExercise} />
          <Route exact path="/edit-exercise/:id" component={EditExercise} />
          <Route exact path="/exercise/:id" component={ViewExercise} />
          <Route
            exact
            path="/student/exercise/:id"
            component={StudentExercise}
          />
          <Route
            exact
            path="/student/login/:exercise_id"
            component={StudentLogin}
          />
        </Switch>
      </div>
    );
  }
}

export default Pages;
