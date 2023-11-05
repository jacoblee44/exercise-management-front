import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import LoginForm from "./LoginForm";
import { login } from "../../redux/actions/auth";
import { authErrors, isAuthenticated } from "../../redux/reducers";
import Particles from "react-particles-js";
import LoginParticleParam from "../params/LoginParticleParam";

const Login = props => {
  const params = LoginParticleParam;
  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <div className="login-container login-container--teacher d-flex justify-content-center align-items-center">
          <LoginForm {...props} />
        </div>
        <Particles
          className="particles-js"
          params={params}
          width={window.innerWidth}
          height={window.innerHeight}
          canvasClassName="particle-canvas"
        />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    errors: authErrors(state),
    isAuthenticated: isAuthenticated(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmit: auth => {
    dispatch(login(auth));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
