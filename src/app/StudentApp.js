import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../scss/style.scss";

import StudentRouter from "./StudentRouter";

export default class StudentApp extends Component {
  render() {
    return <StudentRouter />;
  }
}
