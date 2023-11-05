import React, { Component } from "react";
import { ReactComponent as LogoutSVG } from "../../img/icons/logout.svg";
import { logout } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class Logout extends Component {
  logout = () => {
    this.props.logout();
  };
  render() {
    if (this.props.login) {
      return (
        <div className="logout" onClick={this.logout}>
          <LogoutSVG />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default connect(
  state => ({ login: state.auth.access }),
  dispatch => ({ logout: () => dispatch(logout()) })
)(Logout);
