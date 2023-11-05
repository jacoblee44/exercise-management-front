import React from "react";
import LinkButton from "../../components/LinkButton";
import Button from "../../components/Button";
import UnitTable from "./components/UnitTable";
import DSMTable from "./components/DSMTable";
import BaseAPIComponent from "../../lib/BaseAPIComponent";
import GenerateLinkModal from "./components/GenerateLinkModal";
import ShowAnswerModal from "./components/ShowAnswerModal";
import { download } from "../../lib/api";

export default class ViewExercise extends BaseAPIComponent {
  constructor(props) {
    super(props);
    this.exercise = props.match.params.id;
    this.state = {
      url: "/api/exercise/" + this.exercise
    };
  }

  apiRender() {
    let data = this.state.data;
    return (
      <React.Fragment>
        <div className="content__header pt-4 pb-2 d-flex align-items-center">
          <h1>{data.name}</h1>
          <Button
            onClick={() => this.refs.linkModal.toggle()}
            className="button ml-auto mr-3"
            text="Generate link"
          />
          <Button
            onClick={() => this.refs.answerModal.toggle()}
            className="button ml-0 mr-3"
            text="View Answers"
            icon="arrow_next.svg#Arrow_next"
            iconWidth={25}
          />
          <LinkButton
            className="button button--wico  ml-0 mr-3"
            disabled={true}
            text="Edit"
            icon="edit.svg#edit"
            iconWidth={20}
            iconHeight={20}
            to={"/edit-exercise/" + data.id}
          />
          <Button
            onClick={() => this.props.history.goBack()}
            text="Close"
            icon="close.svg#close"
            className="button button--wico ml-0"
          />
        </div>
        <div className="name-input">{data.exerciseName}</div>
        <div className="content-block box-shadow d-flex align-items-center">
          <h4 className="m-0">Exercise description:</h4>
          <div className="file-name mx-auto">
            <h4 className="m-0 row">
              {data.file ? (
                <p className="exercise_file">Description.pdf</p>
              ) : (
                <p>No description file</p>
              )}
            </h4>
          </div>
          <Button
            text="Download file"
            className="button inline-block ml-auto"
            icon="download.svg#download"
            iconWidth={24}
            iconHeight={24}
            onClick={() => download(data.file.path)}
          />
        </div>

        <UnitTable
          ref="UnitTable"
          onChange={this.onChangeUnit}
          data={data.units}
          mode="view"
        />
        <DSMTable
          ref="DSMTable"
          letters={data.letters}
          data={data.matrix}
          mode="view"
        />

        <div className="footer-actions d-flex align-items-center my-5 pl-4">
          <div className="custom-control custom-checkbox--activities custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="provide"
              name="provide"
              defaultChecked={data.provide || true}
              onChange={this.handleInputChange}
              disabled={true}
            />
            <label className="custom-control-label" htmlFor="provide" />
          </div>
          <p className="ml-2 mb-0">Provide solutions</p>
        </div>
        <GenerateLinkModal ref="linkModal" link={data.link} exercise={data} />
        <ShowAnswerModal
          ref="answerModal"
          data={{ id: data.id, name: data.name }}
        />
      </React.Fragment>
    );
  }
}
