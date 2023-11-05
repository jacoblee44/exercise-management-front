import React, { Component } from "react";
import HeaderSidebar from "./HeaderSidebar";
import HeaderActions from "./HeaderActions";
export default class Header extends Component {
  render() {
    return (
      <header className="plat-header">
        <HeaderSidebar />
        <HeaderActions />
      </header>
    );
  }
}
