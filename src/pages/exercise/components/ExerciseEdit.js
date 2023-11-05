import React, { Component } from "react";
import UploadButton from "../../../components/UploadButton";
import SVG from "../../../components/SVG";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import UnitTable from "./UnitTable";
import DSMTable from "./DSMTable";
import { withRouter } from "react-router";
import api from "../../../lib/api";
import GenerateLinkModal from "./GenerateLinkModal";

class ExerciseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props };
  }
  uploadDescription = file => {
    this.setState({
      file: file
    });
  };

  handleInputChange = event => {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const submitData = {
      provide: this.state.provide,
      name: this.state.name,
      file: this.state.file,
      letters: this.state.letters,
      units: this.refs.UnitTable.state.data,
      matrix: this.refs.DSMTable.getData()
    };

    let form_data = new FormData();

    if (this.state.id) form_data.append("id", this.props.exerciseId);
    form_data.append("name", submitData.name);
    form_data.append("provide", submitData.provide);

    form_data.append("file", submitData.file);
    form_data.append("data", JSON.stringify(submitData));

    let url = this.state.id ? "/api/edit-exercise/" : "/api/create-exercise/";

    api
      .post(url, form_data, { "content-type": "multipart/form-data" })
      .then(response => {
        this.props.history.goBack();
      });
  };

  onChangeUnit = unit_data => {
    this.setState({
      letters: unit_data.map(data => data.letter)
    });
  };

  render() {
    const errors = this.state.errors || {};
    const data = this.state;

    return (
      <React.Fragment>
        <div className="content__header pt-4 pb-2 d-flex align-items-center">
          <h1>{data.id ? "Edit Exercise" : "New exercise"}</h1>
          <Button
            onClick={() => this.props.history.goBack()}
            text="Close"
            icon="close.svg#close"
            className="button button--wico"
          />
        </div>
        <div className="name-input">
          <TextInput
            type="text"
            name="name"
            placeholder="Enter exercise name"
            onChange={this.handleInputChange}
            error={errors.name}
            defaultValue={data.name}
          />
        </div>
        <div className="content-block box-shadow d-flex align-items-center">
          <h4 className="m-0">Upload exercise description</h4>
          <div className="file-name mx-auto">
            <h4 className="m-0 row">
              {data.file ? (
                <p className="exercise_file">
                  {data.file.name || data.file.path}
                </p>
              ) : (
                <p>No description file</p>
              )}
              {data.file && (
                <SVG
                  icon="delete.svg#delete"
                  iconWidth={24}
                  iconHeight={24}
                  onClick={() => this.setState({ file: null })}
                  className="cursor-pointer"
                />
              )}
            </h4>
          </div>
          <UploadButton
            text="Upload file"
            className="button inline-block ml-auto"
            icon="upload.svg#upload"
            iconWidth={24}
            iconHeight={24}
            onUpload={this.uploadDescription}
          />
        </div>

        <UnitTable
          ref="UnitTable"
          onChange={this.onChangeUnit}
          data={data.units}
          mode="edit"
        />
        <DSMTable
          ref="DSMTable"
          letters={data.letters}
          data={data.matrix}
          mode="edit"
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
            />
            <label className="custom-control-label" htmlFor="provide" />
          </div>
          <p className="ml-2 mb-0">Provide solutions</p>
          <Button
            onClick={() => this.refs.linkModal.toggle()}
            className="button ml-auto"
            text="Generate link"
            disabled={!this.state.name}
          />
          <Button
            text="Save and submit"
            className="button ml-3"
            onClick={this.onSubmit}
          />
        </div>
        <GenerateLinkModal ref="linkModal" link={data.link} exercise={data} />
      </React.Fragment>
    );
  }
}

export default withRouter(ExerciseEdit);
