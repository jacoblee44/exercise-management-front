import React from "react";
import BaseAPIComponent from "../../lib/BaseAPIComponent";
import UserDropdown from "./UserDropdown";
import UserDropdownMenu from "./UserDropdownMenu";
import classNames from "classnames";

export default class UserProfile extends BaseAPIComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      url: "/api/profile"
    };
  }
  showMenu = event => {
    event.preventDefault();

    this.setState({ toggle: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = () => {
    this.setState({ toggle: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  };

  render() {
    let profileClasses = classNames({
      "user-profile": true,
      show: this.state.toggle
    });
    let dropdownClasses = classNames({
      "dropdown-menu": true,
      show: this.state.toggle
    });
    return (
      <div className={profileClasses}>
        <div className="avatar">
          <img
            src={this.state.data == null ? "" : this.state.data.profile}
            alt="Profile"
          />
        </div>
        <UserDropdown
          toggle={this.state.toggle}
          username={this.state.data == null ? "" : this.state.data.name}
          onClick={this.showMenu}
        />
        <UserDropdownMenu classname={dropdownClasses} />
      </div>
    );
  }
}
