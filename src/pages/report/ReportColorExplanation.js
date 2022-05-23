import ColorExplanation from "components/ColorExplanation/ColorExplanation";
import colors from "configuration/colors";
import React from "react";

const ReportColorExplanation = ({title, subtitle=""}) => {
  return (
    <ColorExplanation
      title={title}
      subtitle={subtitle}
      data={[
          {text: " < 5%", color: colors.success},
          {text: " < 10%", color: colors.warning},
          {text: " >= 10%", color: colors.danger},
      ]}
    />
  );
};

export default ReportColorExplanation;
