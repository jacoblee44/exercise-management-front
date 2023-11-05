import React, { Component } from "react";
import UserProfile from "./UserProfile";
import Logout from "./Logout";

export default class HeaderActions extends Component {
  render() {
    return (
      <div className="header-actions">
        <UserProfile />
        <Logout />
      </div>
    );
  }
}
