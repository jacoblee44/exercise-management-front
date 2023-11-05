import React from "react";
import LinkButton from "../../components/LinkButton";
import BaseAPIComponent from "../../lib/BaseAPIComponent";
import ExerciseTable from "./components/ExerciseIndexTable";

export default class Dashboard extends BaseAPIComponent {
  constructor(props) {
    super(props);
    this.state.url = "/api/exercise-list";
  }

  apiRender() {
    return (
      <div>
        <React.Fragment>
          <div className="content__header py-4  d-flex align-items-center">
            <h1>All exercises</h1>
            <LinkButton
              text="Create new"
              icon="plus.svg#plus"
              className="button"
              iconWidth={16}
              iconHeight={16}
              iconClassName="button__icon button__icon-blue"
              to="/create-exercise"
            />
          </div>
          <ExerciseTable data={this.state.data} />
        </React.Fragment>
      </div>
    );
  }
}
