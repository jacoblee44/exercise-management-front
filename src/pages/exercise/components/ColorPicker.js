import React, { Component } from "react";
import SVG from "../../../components/SVG";
import { CirclePicker } from "react-color";

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      toggle: false
    };
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  handleChange = (color, event) => {
    this.setState({
      color: color.hex
    });
    this.props.setColor(color.hex);
  };
  render() {
    const popover = {
      position: "absolute",
      zIndex: "2",
      marginLeft: "160px",
      backgroundColor: "white",
      padding: "10px",
      borderRadius: "15px",
      border: "3px solid #342590"
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };
    return (
      <div className="color-picker d-flex justify-content-center">
        <div
          className="color-indicator mr-2"
          style={{ backgroundColor: this.state.color }}
        />
        <SVG
          iconWidth={16}
          iconHeight={16}
          icon="arrowdown.svg#down"
          onClick={this.toggle}
          className="cursor-pointer"
        />
        {this.state.toggle ? (
          <div style={popover}>
            <div style={cover} onClick={this.toggle} />
            <CirclePicker
              color={this.state.color}
              onChange={this.handleChange}
              circleSize={16}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
