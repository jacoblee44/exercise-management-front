import React, { Component } from "react";
import SVG from "./SVG";
export default class Button extends Component {
  render() {
    let {
      meta,
      text,
      iconWidth,
      iconHeight,
      icon,
      iconClassName,
      position,
      className,
      disabled,
      ...otherProps
    } = this.props;

    if (disabled === true) className += " disabled";

    return position === "right" ? (
      <button {...otherProps} className={className} disabled={disabled}>
        <SVG
          icon={icon}
          iconWidth={iconWidth}
          iconHeight={iconHeight}
          iconClassName={iconClassName}
          disabled={disabled}
        />
        {text}
      </button>
    ) : (
      <button {...otherProps} className={className} disabled={disabled}>
        {text}
        <SVG
          icon={icon}
          iconWidth={iconWidth}
          iconHeight={iconHeight}
          iconClassName={iconClassName}
          disabled={disabled}
        />
      </button>
    );
  }
}
