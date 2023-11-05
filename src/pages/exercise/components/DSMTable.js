import React, { Component } from "react";
import Switch from "./Switch";
import MatrixTable from "./MatrixTable";

export default class DSMTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  toggleChange = index => {
    this.setState({
      index: index
    });
  };

  getData = () => {
    return this.refs.MatrixTable.state.data;
  };
  render() {
    let matrixData = this.props.data || [{}, {}];
    return (
      <React.Fragment>
        <div className="define-dsm d-flex align-items-center my-5">
          <h4 className="mb-0">Define DSM</h4>
          <Switch
            list={["Positive", "Negative"]}
            onChange={this.toggleChange}
          />
        </div>
        <MatrixTable
          ref="MatrixTable"
          display={this.state.index}
          data={matrixData}
          letters={this.props.letters}
          mode={this.props.mode}
        />
      </React.Fragment>
    );
  }
}
