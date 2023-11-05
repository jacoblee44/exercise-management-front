import React, { Component } from "react";
import Logout from "../../header/Logout";
export default class HeaderActions extends Component {
  render() {
    return (
      <div className="header-actions">
        <Logout />
      </div>
    );
  }
}
