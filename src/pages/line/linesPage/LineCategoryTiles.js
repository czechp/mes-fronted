import React from "react";

import LineTile from "./LineTile";
import "../../../GlobalStyle.css";
import Separator from "components/Separator/Separator";

const LineCategoryTiles = ({ title, lines }) => {
  return (
    <div className="center-container" style={lineCategoryTilesStyle}>
      <h3>{title}</h3>
      <Separator />
        <div className="" style={{ display: "flex", flexWrap: "wrap" }}>
          {lines.map((line, idx) => (
            <LineTile key={`${idx}-${line.id}`} line={line} />
          ))}
        </div>
    </div>
  );
};

const lineCategoryTilesStyle = {
  width: "100%",
  marginBottom: "20px",
};

export default LineCategoryTiles;
