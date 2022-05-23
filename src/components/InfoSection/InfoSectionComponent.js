import Separator from "components/Separator/Separator";
import React from "react";

import "./InfoSectionComponent.css";

const InfoSectionComponent = ({ title = null, children }) => {
  return (
    <div className="info-section-container">
      {title && <h1 className="info-section-title">{title}</h1>}
      <div className="info-form-style">{children}</div>
    </div>
  );
};

export const InfoSectionSubtitle = ({ title }) => {
  return (
    <div className="" style={{ width: "100%" }}>
      <h3>{title}</h3>
      <Separator />
    </div>
  );
};

export default InfoSectionComponent;
