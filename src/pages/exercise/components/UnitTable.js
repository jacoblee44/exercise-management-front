import React, { Component } from "react";
import ColorPicker from "./ColorPicker";
import Button from "../../../components/Button";
import { getNextLetter, getColorFromLetter } from "./UnitTableUtil";
import SVG from "../../../components/SVG";
export default class UnitTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || []
    };
  }

  updateChanges = data => {
    this.setState({
      data: data
    });
    !this.props.onChange || this.props.onChange(data);
  };

  onAddUnit = () => {
    let rows = this.state.data.length;
    let lastLetter = rows > 0 && this.state.data[rows - 1].letter;
    let letter = getNextLetter(lastLetter);
    let data = [
      ...this.state.data,
      {
        letter: letter,
        name: "",
        color: "#" + getColorFromLetter(letter)
      }
    ];
    this.updateChanges(data);
  };

  onChangeName = (letter, event) => {
    let data = [...this.state.data];
    data = data.map(item =>
      item.letter !== letter ? item : { ...item, name: event.target.value }
    );
    this.updateChanges(data);
  };

  onRemoveUnit = letter => {
    let data = [...this.state.data];
    data = data.filter(item => item.letter !== letter);
    this.updateChanges(data);
  };

  onChangeColor = (color, letter) => {
    let data = [...this.state.data];
    data = data.map(item =>
      item.letter !== letter ? item : { ...item, color: color }
    );
    this.updateChanges(data);
  };

  render() {
    return (
      <div className="content-block box-shadow">
        {this.props.mode === "edit" && (
          <div className="content-block-header d-flex align-items-center mb-4">
            <h4 className="mb-0">Enter data and choose colors for units</h4>
            <Button
              className="button mr-3 py-1 px-4 ml-auto"
              text="Add unit"
              icon="plus.svg#plus"
              onClick={this.onAddUnit}
            />
          </div>
        )}
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Role unit letter</th>
                <th>Role unit name</th>
                <th>
                  {this.props.mode === "edit" && "Select unit color"}
                  {this.props.mode === "view" && "Unit color"}
                </th>
                {this.props.mode === "edit" && <th />}
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(row => (
                <tr key={row.letter}>
                  <td className="rul">{row.letter}</td>
                  <td className="run">
                    {this.props.mode === "edit" && (
                      <input
                        type="text"
                        placeholder="Enter unit name"
                        defaultValue={row.name}
                        onChange={event => this.onChangeName(row.letter, event)}
                      />
                    )}
                    {this.props.mode === "view" && <div>{row.name}</div>}
                  </td>
                  <td className="suc">
                    {this.props.mode === "edit" && (
                      <ColorPicker
                        color={row.color}
                        setColor={color =>
                          this.onChangeColor(color, row.letter)
                        }
                      />
                    )}
                    {this.props.mode === "view" && (
                      <div className="color-picker d-flex justify-content-center">
                        <div
                          className="color-indicator mr-2"
                          style={{ backgroundColor: row.color }}
                        />
                      </div>
                    )}
                  </td>
                  {this.props.mode === "edit" && (
                    <td>
                      <SVG
                        icon="delete.svg#delete"
                        iconWidth={24}
                        iconHeight={24}
                        className="cursor-pointer"
                        onClick={() => this.onRemoveUnit(row.letter)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
