import React, { Component } from "react";
import UploadButton from "../../../components/UploadButton";

export default class MatrixTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data || {}
    };
  }

  onDataChange = (row_letter, col_letter) => {
    if (this.props.mode !== "edit") return;
    let data = { ...this.state.data };
    let d = data[this.props.display];
    if (!d[row_letter]) d[row_letter] = {};
    let value = d[row_letter][col_letter] || 0;
    d[row_letter][col_letter] = 1 - value;
    this.setState({
      data: data
    });
  };

  getStyle = (row, col, value) => {
    if (row === this.state.current_row && col === this.state.current_col) {
      return {
        backgroundColor: "#4963fe55"
      };
    }

    if (
      row === this.state.current_row ||
      (col && col === this.state.current_col)
    ) {
      return {
        backgroundColor: "#4963fe25"
      };
    }
  };

  uploadData = (file, data) => {
    this.setState({ data: data });
  };

  render() {
    let data = this.state.data[this.props.display];
    let letters = this.props.letters || [];
    return (
      <div className="content-block box-shadow">
        {this.props.mode === "edit" && (
          <div className="content-block-header d-flex align-items-center mb-4">
            <h4 className="mb-0">
              Click to select and double click to change.
            </h4>
            <UploadButton
              className="button ml-auto"
              text="Upload matrix"
              url="/api/upload/matrixfile"
              onUpload={this.uploadData}
            />
          </div>
        )}
        <div className="data-table data-table--values">
          <table>
            <thead>
              <tr>
                <th />
                {letters.map(letter => (
                  <th key={letter} style={this.getStyle(0, letter)}>
                    {letter}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {letters.map(row_letter => (
                <tr key={row_letter}>
                  <td style={this.getStyle(row_letter)}>{row_letter}</td>
                  {letters.map(col_letter => {
                    let value =
                      data[row_letter] && data[row_letter][col_letter]
                        ? data[row_letter][col_letter]
                        : "0";

                    return (
                      <td
                        key={col_letter}
                        className="cursor-pointer no-select"
                        onDoubleClick={() =>
                          this.onDataChange(row_letter, col_letter)
                        }
                        onClick={() =>
                          this.setState({
                            current_row: row_letter,
                            current_col: col_letter
                          })
                        }
                        style={this.getStyle(row_letter, col_letter, value)}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
