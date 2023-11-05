import React, { Component } from "react";
import HeaderSidebar from "../header/HeaderSidebar";
import HeaderActions from "./components/HeaderActions";
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
