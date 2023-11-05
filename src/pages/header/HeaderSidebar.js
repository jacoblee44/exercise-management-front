import React, { Component } from "react";
import { ReactComponent as Logo } from "../../img/logo.svg";
import classNames from "classnames";

class HeaderSidebar extends Component {
  render() {
    let topSidebarClass = classNames({
      "logo-wrapper": true
    });
    return (
      <div className={topSidebarClass}>
        <div className="logo">
          <Logo />
        </div>
      </div>
    );
  }
}

export default HeaderSidebar;
