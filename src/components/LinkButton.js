import React, { Component } from "react";
import { Link } from "react-router-dom";
import SVG from "./SVG";

export default class LinkButton extends Component {
  render() {
    const {
      text,
      to,
      position,
      icon,
      iconWidth,
      iconHeight,
      iconClassName,
      ...otherProps
    } = this.props;
    return position === "right" ? (
      <Link {...otherProps} to={to}>
        {this.renderIcon()}
        {text}
      </Link>
    ) : (
      <Link {...otherProps} to={to}>
        {text}
        <SVG
          icon={icon}
          iconWidth={iconWidth}
          iconHeight={iconHeight}
          iconClassName={iconClassName}
        />
      </Link>
    );
  }
}
