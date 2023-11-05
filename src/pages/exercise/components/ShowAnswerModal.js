import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import Button from "../../../components/Button";
import { DateRange } from "react-date-range";
import api from "../../../lib/api";
const FileDownload = require("js-file-download");

export default class ShowAnswerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: this.props.data,
      startDate: new Date(),
      endDate: new Date()
    };
  }

  showModal = data => {
    this.setState({
      data: data,
      modal: true
    });
  };

  handleSelect = range => {
    this.setState({
      startDate: range.startDate,
      endDate: range.endDate
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  download = () => {
    let params = {
      id: this.state.data.id,
      startDate: this.state.startDate.format("YYYY/MM/DD"),
      endDate: this.state.endDate.format("YYYY/MM/DD")
    };
    api.get("/api/exercise/download-answer", params).then(response => {
      FileDownload(JSON.stringify(response.data), "report.json");
    });
    this.toggle();
  };

  render() {
    const data = this.state.data;

    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-dialog-mini modal-dialog-centered "
        >
          <ModalBody className="text-center p-5">
            <h3>{data ? data.name : ""}</h3>
            <DateRange
              format="dd-mm-yyyy"
              locale="en-UK"
              onInit={this.handleSelect}
              onChange={this.handleSelect}
            />
            <Button
              text="Download answers"
              onClick={this.download}
              className="button"
            />
            <Button
              className="closeX"
              icon="close.svg#close"
              onClick={this.toggle}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
