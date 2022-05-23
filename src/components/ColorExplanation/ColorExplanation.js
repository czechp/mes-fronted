import Separator from "components/Separator/Separator";
import React from "react";

const ColorExplanation = ({ title = "", subtitle = "", data,  }) => {
  return (
    <div style={{marginBottom: "10px", marginTop: "100px",  width: "100%"}}>
      <h3 style={{ marginBottom: "30px" }}>{title}</h3>
      {subtitle && <h5 style={{ marginBottom: "30px" }}>{subtitle}</h5>}
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {data.flatMap((data, idx) => (
          <ColorTile key={`${idx}`} color={data.color} text={data.text} />
        ))}
      </div>
      <Separator />
    </div>
  );
};

const ColorTile = ({ color, text }) => {
  const lineColorsLineStyle = {
    borderLeft: `15px solid ${color}`,
    minHeight: "60px",
    paddingLeft: "20px",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div className="" style={lineColorsLineStyle}>
      <h5>{text}</h5>
    </div>
  );
};

export default ColorExplanation;
