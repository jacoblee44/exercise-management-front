import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { isAuthenticated } from "../../redux/reducers";
import { getExerciseId } from "./helper";
import { start } from "../../redux/actions/student";
import Error404 from "../../components/Error404";
import Loading from "../../components/Loading";

class PrivateRoute extends Component {
  componentDidMount() {
    this.props.getExercise();
  }
  render() {
    const {
      component: Component,
      isAuthenticated,
      exercise,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : exercise && !exercise.error && !exercise.loading ? (
            <Redirect
              to={{
                pathname: `/student/${exercise.id}/login`,
                state: { from: props.location }
              }}
            />
          ) : !exercise || exercise.loading ? (
            <Loading />
          ) : (
            <Error404 />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: isAuthenticated(state, "student"),
    exercise: state.exercise
  };
};

const mapDispatchToProps = dispatch => ({
  getExercise: () => {
    let exerciseId = getExerciseId();
    dispatch(start(exerciseId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
