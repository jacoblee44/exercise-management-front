import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { isAuthenticated } from "../../redux/reducers/auth";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const mapStateToProps = state => {
  return {
    isAuthenticated: isAuthenticated(state.auth)
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
