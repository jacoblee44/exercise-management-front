import React, { Component } from "react";
import Button from "../../components/Button";
import GroupList from "./components/GroupList";
import SubmitModal from "./components/SubmitModal";
import { connect } from "react-redux";
import { getExerciseId } from "./helper";
import { start } from "../../redux/actions/student";

class Exercise extends Component {
  getDataAndSubmit = event => {
    let data = this.refs.exercise.state.data;
    let groupedData = data.groups.map((group, index) => ({
      name: group.name,
      list: [].concat(...group.list.map(column => data.columns[column]))
    }));
    this.refs.submitModal.setState({
      data: groupedData
    });
    this.refs.submitModal.toggle();
  };

  componentDidMount() {
    if (!this.props.exercise) this.props.getExercise();
  }

  render() {
    let ex = this.props.exercise;
    return (
      ex && (
        <div className="content">
          <div className="content__header py-4  d-flex align-items-center">
            <h1>{ex.name}</h1>
            <Button
              className="button"
              text="Comment and submit"
              onClick={this.getDataAndSubmit}
            />
          </div>
          <div className="content-block box-shadow">
            <GroupList ref="exercise" />
          </div>
          <SubmitModal
            ref="submitModal"
            exercise={ex}
            answerUrl={`/student/${ex.id}/answer`}
          />
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  exercise: state.exercise
});

const mapDispatchToProps = dispatch => ({
  getExercise: () => {
    let exerciseId = getExerciseId();
    dispatch(start(exerciseId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercise);
