import React, { Component } from "react";

export default class Switch extends Component {
  state = {
    index: 0
  };

  onClick = index => {
    this.setState({
      index: index
    });
    if (this.props.onChange) this.props.onChange(index);
  };

  render() {
    let list = this.props.list || [];

    return (
      <div className="switch">
        <ul>
          {list.map((text, index) => (
            <li
              key={index}
              className={index === this.state.index ? "active" : ""}
              onClick={() => this.onClick(index)}
            >
              {text}
            </li>
          ))}
          <div
            className="switcher"
            style={{
              left: `${(this.state.index * 100) / list.length}%`,
              width: `${100 / list.length}%`
            }}
          />
        </ul>
      </div>
    );
  }
}
