import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import Button from "../../../components/Button";
import { hashstr } from "../../../lib/hash";
export default class ShowAnswerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  getHash = name => {
    if (name) return window.location.origin + "/student/" + hashstr(name);
    else return "";
  };

  copyLink = () => {
    this.refs.url.select();
    document.execCommand("copy");
  };

  render() {
    let ex = this.props.exercise;

    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-dialog-mini modal-dialog-centered "
        >
          <ModalBody className="text-center p-5">
            <h3>{ex.name}</h3>
            <p>Invite people to the exercise</p>
            <input
              ref="url"
              className="mb-4"
              type="text"
              name="link"
              defaultValue={this.getHash(ex.name)}
              readOnly=""
            />
            <Button
              text="Copy link"
              onClick={this.copyLink}
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
