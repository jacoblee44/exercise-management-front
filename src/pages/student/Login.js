import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import StudentLoginForm from "./components/StudentLoginForm";
import Particles from "react-particles-js";
import LoginParticleParam from "../params/LoginParticleParam";
import { authErrors, isAuthenticated } from "../../redux/reducers";
import { login, start } from "../../redux/actions/student";
import { getExerciseId } from "./helper";

class Login extends Component {
  componentDidMount() {
    if (!this.props.exercise) this.props.getExercise();
  }
  render() {
    const params = LoginParticleParam;
    let exercise = this.props.exercise;
    if (
      exercise &&
      !exercise.error &&
      !exercise.loading &&
      this.props.isAuthenticated
    ) {
      return <Redirect to={`/student/${this.props.exercise.id}`} />;
    } else {
      return (
        <div>
          <div className="login-container login-container--student d-flex justify-content-center align-items-center">
            <StudentLoginForm {...this.props} />
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
  }
}

const mapStateToProps = state => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state, "student"),
  exercise: state.exercise
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(login(values)),
  getExercise: () => {
    let exerciseId = getExerciseId();
    dispatch(start(exerciseId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
