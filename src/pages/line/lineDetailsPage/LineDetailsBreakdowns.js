import React from "react";


import InfoSectionComponent from "components/InfoSection/InfoSectionComponent";
import colors from "configuration/colors";
import BreakdownList from "pages/breakdowns/BreakdownsList";

const LineDetailsBreakdowns = ({ breakdowns }) => {
  return (
    <InfoSectionComponent title="Aktualne awarie:">
      {breakdowns.length > 0 && <BreakdownList breakdowns={breakdowns} />}
      {breakdowns.length === 0 && (
        <span style={{ fontSize: "30px", color: colors.success }}>
          Brak aktualnie otwartych awarii
        </span>
      )}
    </InfoSectionComponent>
  );
};

export default LineDetailsBreakdowns;
