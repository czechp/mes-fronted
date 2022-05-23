import React, { useEffect, useState } from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import "../../../GlobalStyle.css";
import "./LinePage.css";
import { getColorForLineState } from "utilities/commonUtilities";
import colors from "configuration/colors";
import colorSpecifier from "utilities/colorSpecifier";
import CircleProgressBar from "components/CircleProgressBar/CircleProgressBar";
import OeeProgressBar from "components/OeeProgressBar/OeeProgressBar";

const LineTile = ({ line }) => {
  const [tileStyle, setTileStyle] = useState({});
  const history = useHistory();
  useEffect(() => {
    setTileStyle(lineTileStyleBase);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTileStyle(lineTileStyleBase);
  });

  const lineTileStyleBase = {
    width: "300px",
    height: "390px",
    border: `3px solid ${getColorForLineState(line.lineStatus)}`,
    margin: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const lineTileStyleHover = {
    border: "3px solid white",
  };

  const onMouseEnter = () => {
    setTileStyle({ ...lineTileStyleBase, ...lineTileStyleHover });
  };

  const onMouseLeave = () => {
    setTileStyle(lineTileStyleBase);
  };

  const onClick = () => {
    history.push("/line-details/" + line.id);
  };

  return (
    <div className="">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={tileStyle}
      >
        <h1 style={{ marginTop: "5px" }}>{line.name}</h1>
        Produkt:
        {line.productName ? <p>{line.productName}</p> : <p>Brak</p>}
        Operator:
        {line.operator ? <p>{line.operator}</p> : <p>Brak</p>}
        <LineTileReport report={line.activeReport} />
      </div>

      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {line.rfidReaderError && (
          <div className="">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              size="2x"
              color="red"
            />
            <p style={{ color: "red", fontSize: "smaller" }}>
              Błąd czytnika RFID
            </p>
          </div>
        )}

        {line.opcUaCommunicationError && (
          <div className="">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              size="2x"
              color="red"
            />
            <p style={{ color: "red", fontSize: "smaller" }}>
              Błąd komunikacji OPC
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const LineTileReport = ({ report }) => {
  const color = report
    ? colorSpecifier.report(
        report.statistics.currentProductionPercent,
        report.statistics.expectedProductionPercent
      )
    : colors.primary;
  return (
    <>
      <div className="line-tile-report-container">
        {report && (
          <div className="" style={{ width: "100%" }}>
            <h5 style={{ color }}>{report.amount} szt.</h5>
            <div
              className=""
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <OeeProgressBar
                oee={report.statistics.oee}
                style={{ height: "100px", width: "100px" }}
              />
              <CircleProgressBar
                title="Produkcja"
                style={{ height: "100px", width: "100px" }}
                value={report.statistics.currentProductionPercent}
                color={color}
              />
            </div>
          </div>
        )}
        {!report && (
          <p style={{ color: colors.danger }}>
            Brak <br /> raportu
          </p>
        )}
      </div>
    </>
  );
};

export default LineTile;
