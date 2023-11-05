import React, { Component } from "react";
import Dropzone from "react-dropzone";
import api from "../lib/api";

import SVG from "./SVG";

export default class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || "",
      disabled: false
    };
  }

  onDrop = acceptedFiles => {
    if (!this.props.onUpload) return;
    const file = acceptedFiles[0];
    if (this.props.url) {
      this.setState({
        text: "Uploading", // + acceptedFiles[0].name,
        disabled: true
      });

      const formData = new FormData();
      formData.append("file", file);
      const headers = {
        "content-type": "multipart/form-data"
      };
      api.post(this.props.url, formData, headers).then(response => {
        this.setState({ text: this.props.text });
        this.props.onUpload(file, response.data);
      });
    } else {
      this.props.onUpload(file);
    }
  };

  render() {
    const {
      text,
      icon,
      iconWidth,
      iconHeight,
      iconClassName,
      multiple,
      onUpload,
      ...otherProps
    } = this.props;
    return (
      <Dropzone onDrop={this.onDrop} multiple={multiple}>
        {({ getRootProps, getInputProps }) => (
          <div
            disabled={this.props.disabled || this.state.disabled}
            {...getRootProps()}
            {...otherProps}
          >
            <input {...getInputProps()} />
            {this.state.text}
            <SVG
              icon={icon}
              iconWidth={iconWidth}
              iconHeight={iconHeight}
              iconClassName={iconClassName}
            />
          </div>
        )}
      </Dropzone>
    );
  }
}
