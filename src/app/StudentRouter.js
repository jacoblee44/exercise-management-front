import React from "react";
import { Route, Switch } from "react-router-dom";

//Layouts
import StudentHeader from "../pages/student/Header";
import Exercise from "../pages/student/Exercise";
import Answer from "../pages/student/Answer";

const Router = () => {
  return (
    <div>
      <StudentHeader />
      <div className="plat-content">
        <Switch>
          <Route strict path="/student/:exercise/answer" component={Answer} />
          <Route strict path="/student/:exercise" component={Exercise} />
        </Switch>
      </div>
    </div>
  );
};

export default Router;
