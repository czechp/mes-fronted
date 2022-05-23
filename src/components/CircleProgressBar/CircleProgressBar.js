import colors from "configuration/colors";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./CircleProgressBar.css";

const CircleProgressBar = ({
  value,
  color = colors.primary,
  style = {},
  title = "",
  subtitle = "",
}) => {
  return (
    <div className="circle-progress-bar-container" style={style}>
      {title && <h4>{title}</h4>}
      <CircularProgressbar
        styles={buildStyles({
          pathColor: color,
          textColor: color,
        })}
        value={value}
        text={`${value.toFixed(2)}%`}
      />
      {subtitle && (
        <h4 className="circle-progress-bar-subtitle" style={{ color }}>
          {subtitle}
        </h4>
      )}
    </div>
  );
};

export default CircleProgressBar;
