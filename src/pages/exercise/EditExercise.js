import React from "react";
import ExerciseEdit from "./components/ExerciseEdit";
import BaseAPIComponent from "../../lib/BaseAPIComponent";

export default class EditExercise extends BaseAPIComponent {
  constructor(props) {
    super(props);
    this.state = {
      url: "/api/exercise/" + props.match.params.id
    };
  }
  apiRender() {
    return <ExerciseEdit {...this.state.data} />;
  }
}
