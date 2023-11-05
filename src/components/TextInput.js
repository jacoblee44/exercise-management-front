import React from "react";
import { FormFeedback } from "reactstrap";
export default ({ name, label, error, type, ...rest }) => {
  const id = `id_${name}`,
    input_type = type ? type : "text";
  return (
    <React.Fragment>
      <input
        type={input_type}
        name={name}
        id={id}
        className={error ? "is-invalid" : ""}
        {...rest}
      />
      {error ? (
        <FormFeedback className="invalid-feedback">{error}</FormFeedback>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
