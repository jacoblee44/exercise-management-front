import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import Button from "../../../components/Button";
import api from "../../../lib/api";
import LinkButton from "../../../components/LinkButton";

export default class SubmitModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: null,
      comment: ""
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      page: "comment"
    });
  };

  renderCommentPage = () => {
    return (
      <div className="save-submit">
        <h2 className="my-4">Write your comment</h2>
        <div className="comment row mb-4">
          <textarea
            name="comment"
            id="comment"
            rows="5"
            placeholder="Comment"
            onChange={event => this.setState({ comment: event.target.value })}
          />
        </div>
        <Button
          text="Save & submit"
          onClick={() => this.setState({ page: "confirm" })}
          className="button"
        />
      </div>
    );
  };

  submitData = () => {
    api
      .post("/api/student/submit", {
        exercise: this.props.exercise.id,
        data: {
          comment: this.state.comment,
          solution: this.state.data
        }
      })
      .then(response => {
        this.setState({
          result: response.data,
          page: "result"
        });
      });
  };

  renderConfirmPage = () => {
    return (
      <div className="cancel-submit">
        <h2 className="my-4">Are you sure you want to submit your answers?</h2>

        <Button
          text="Back"
          onClick={() => this.toggle()}
          className="button mx-3"
        />
        <Button
          text="Save & submit"
          onClick={this.submitData}
          className="button mx-3"
        />
      </div>
    );
  };

  showAnswer = () => {
    this.toggle();
  };

  renderResultPage = () => {
    return (
      <div className="final-answers">
        <Button
          className="closeX"
          onClick={this.toggle}
          icon="close.svg#close"
        />
        <h3>Distance score to the positive DSM solution:</h3>
        <p>(lower score is better)</p>
        <h2 className="my-4">{this.state.result.positive}</h2>
        <h3>Distance score to the negative DSM solution:</h3>
        <p>(lower score is better)</p>
        <h2 className="my-4">{this.state.result.negative}</h2>
        <h3>Distance score to the negative DSM solution:</h3>
        <h2 className="my-4">{this.state.result.average}</h2>
        {this.state.result.resultHidden || (
          <LinkButton
            text="Show answer"
            className="button"
            onClick={this.showAnswer}
            to={{
              pathname: this.props.answerUrl,
              data: this.state.data,
              exercise: this.props.exercise
            }}
          />
        )}
      </div>
    );
  };

  renderPage = () => {
    switch (this.state.page) {
      case "comment":
        return this.renderCommentPage();
      case "confirm":
        return this.renderConfirmPage();
      case "result":
        return this.renderResultPage();
      default:
        return;
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-dialog-centered "
        >
          <ModalBody className="text-center p-5">{this.renderPage()}</ModalBody>
        </Modal>
      </div>
    );
  }
}
