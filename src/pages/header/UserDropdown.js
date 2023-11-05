import React, { Component } from "react";
import { ReactComponent as ArrowDown } from "../../img/icons/arrowdown.svg";
export default class UserDropdown extends Component {
  render() {
    return (
      <h4
        className="username"
        data-toggle="dropdown"
        onClick={this.props.onClick}
        aria-expanded={this.props.toggle}
      >
        {this.props.username}
        <ArrowDown />
      </h4>
    );
  }
}
