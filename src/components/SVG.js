import React from "react";

const SVG = props => {
  let {
    iconWidth,
    iconHeight,
    icon,
    iconClassName,
    disabled,
    ...otherProps
  } = props;
  let iconCls = "button__icon";
  if (!iconWidth) iconWidth = 16;
  if (!iconHeight) iconHeight = 16;
  if (!disabled) {
    if (!iconClassName) iconCls += " button__icon-blue";
    else iconCls += " " + iconClassName;
  }

  if (!icon) return "";
  let svg_link = "";
  try {
    const [icon_file, icon_id] = icon.split("#");
    svg_link = require(`../img/icons/${icon_file}`) + `#${icon_id}`;
  } catch (e) {
    console.log("Cannot find file:" + icon + e);
  }
  return (
    <svg
      width={`${iconWidth}px`}
      height={`${iconHeight}px`}
      viewBox={`0 0  ${iconWidth} ${iconHeight}`}
      {...otherProps}
    >
      <use
        xlinkHref={svg_link}
        preserveAspectRatio="xMinYMid"
        className={iconCls}
      />
    </svg>
  );
};

export default SVG;
