import React, { Component } from "react";
import Error404 from "../../components/Error404";
import LinkButton from "../../components/LinkButton";

export default class Answer extends Component {
  render() {
    const { exercise, data } = this.props.location;
    if (!exercise) return <Error404 />;
    let redirect = `/student/${exercise.id}`;
    return (
      <div className="content">
        <div className="content__header py-4  d-flex align-items-center">
          <h1>
            <LinkButton
              text={exercise.name}
              to={redirect}
            />
            > Submition review
          </h1>
          <LinkButton
            text="Close"
            icon="close.svg#close"
            className="button  button--wico"
            to={redirect}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="content-block box-shadow">Left</div>
          </div>
          <div className="col-md-6">
            <div className="content-block box-shadow">Left</div>
          </div>
        </div>
      </div>
    );
  }
}
