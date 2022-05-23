import CircleProgressBar from "components/CircleProgressBar/CircleProgressBar";
import colors from "configuration/colors";
import React from "react";

const OeeProgressBar = ({ oee, subtitle="", style = {} }) => {
  let color = colors.primary;

  if (oee < 85) color = colors.danger;
  else if (oee >= 85 && oee < 96) color = colors.success;
  else color = colors.primary;

  return (
    <div className="">
      <CircleProgressBar
        value={oee}
        title="OEE"
        color={color}
        style={style}
        subtitle={subtitle}
      />
    </div>
  );
};

export default OeeProgressBar;
