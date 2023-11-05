import React, { Component } from "react";
import Button from "../../../components/Button";
import { reduxForm, Field } from "redux-form";

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 15) {
    errors.lastName = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.groupName) {
    errors.groupName = "Required";
  } else if (values.groupName.length > 15) {
    errors.groupName = "Must be 15 characters or less";
  }
  return errors;
};

const warn = values => {
  const warnings = {};
  return warnings;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div style={{ position: "inherit" }}>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span className="tooltip tooltip__dang">{error}</span>) ||
          (warning && (
            <span className="tooltip tooltip__dang">{warning}</span>
          )))}
    </div>
  </div>
);

class StudentLoginForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="login-content">
        <img
          className="logo"
          src={require("../../../img/logo.svg")}
          alt="logo"
        />
        <h3 className="mb-3">
          {this.props.exercise && this.props.exercise.name}
        </h3>
        <form onSubmit={handleSubmit} className="login-form text-center">
          <div className="fields row">
            <div className="col-md-6">
              <Field
                name="firstName"
                type="text"
                component={renderField}
                label="First Name"
              />
              <Field
                name="email"
                type="text"
                component={renderField}
                label="Email"
              />
            </div>
            <div className="col-md-6">
              <Field
                name="lastName"
                type="text"
                component={renderField}
                label="Last name"
              />
              <Field
                name="groupName"
                type="text"
                component={renderField}
                label="Group name"
              />
            </div>
          </div>
          <Button
            text="Log in"
            iconWidth={18}
            iconHeight={14}
            icon="arrow_next.svg#Arrow_next"
            iconClassName="button__icon button__icon-blue"
            type="submit"
            className="button"
            disabled={submitting}
          />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "studentLogin",
  validate,
  warn
})(StudentLoginForm);
