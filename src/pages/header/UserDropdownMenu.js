import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserDropdownMenu extends Component {
  render() {
    const links = [
      { to: "#", text: "Action" },
      { to: "#", text: "Another Action" },
      { to: "#", text: "Something else here" }
    ];
    return (
      <div className={this.props.classname}>
        {links.map(link => (
          <Link key={link.text} to={link.to} className="dropdown-item">
            {link.text}
          </Link>
        ))}
      </div>
    );
  }
}
