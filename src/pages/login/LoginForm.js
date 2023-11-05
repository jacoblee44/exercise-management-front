import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import Button from "../../components/Button";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password is too shot";
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

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };
  handleInputChange = event => {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="login-content">
        <img className="logo" src={require("../../img/logo.svg")} alt="logo" />
        <form onSubmit={handleSubmit} className="login-form text-center">
          <div className="fields row">
            <div className="col-md-12">
              <Field
                type="text"
                name="username"
                component={renderField}
                label="Username"
              />
              <Field
                type="password"
                name="password"
                component={renderField}
                label="Password"
              />
            </div>
          </div>
          <p className="helper-text text-center mt-3 mb-4">
            Not have account?
            <Link to="/signup" className="sign-up">
              Sign up!
            </Link>
          </p>
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
})(LoginForm);
