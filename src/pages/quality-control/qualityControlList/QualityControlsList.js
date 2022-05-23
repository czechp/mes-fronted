import colors from "configuration/colors";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import {
  sortArrayByBoolean,
  sortArrayByNumber,
  sortArrayByString,
  translateProdUserRole,
} from "utilities/commonUtilities";
import dateFormatter from "utilities/dateFormatter";
import QualityControlColorsExplanation from "../QualityControlColorsExplanations";
import "./QualityControlsList.css";

const QualityControlList = ({ qualityControls }) => {
  const [internalList, setInternalList] = useState([]);
  const history = useHistory();
  const [sortMultiplier, setSortMultiplier] = useState(-1);

  useEffect(() => {
    setInternalList(qualityControls);
  }, [qualityControls]);

  const toggleSortMultiplier = () => {
    setSortMultiplier(sortMultiplier * -1);
  };

  const sortById = () => {
    sortArrayByNumber(
      qualityControls,
      "id",
      sortMultiplier,
      setInternalList,
      toggleSortMultiplier
    );
  };

  const sortByResult = () => {
    sortArrayByBoolean(
      qualityControls,
      "qualityOK",
      sortMultiplier,
      setInternalList,
      toggleSortMultiplier
    );
  };

  const sortByInspector = () => {
    sortArrayByString(
      qualityControls,
      "inspector",
      sortMultiplier,
      setInternalList,
      toggleSortMultiplier
    );
  };

  const sortByDepartment = () => {
    sortArrayByString(
      qualityControls,
      "inspectorRole",
      sortMultiplier,
      setInternalList,
      toggleSortMultiplier
    );
  };

  const sortByCreationDate = () => {
    sortArrayByString(
      qualityControls,
      "creationDate",
      sortMultiplier,
      setInternalList,
      toggleSortMultiplier
    );
  };

  const sortByLineName = () => {
    sortArrayByString(
      qualityControls,
      "lineName",
      sortMultiplier,
      setInternalList,
      toggleSortMultiplier
    );
  };

  return (
    <div className="quality-control-container">
      <QualityControlColorsExplanation />
      <Table variant="dark" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th onClick={sortById}>Id:</th>
            <th onClick={sortByLineName}>Linia:</th>
            <th onClick={sortByResult}>Wynik:</th>
            <th onClick={sortByInspector}>Wykonał:</th>
            <th onClick={sortByDepartment}>Dział:</th>
            <th onClick={sortByCreationDate}>Data utworzenia:</th>
          </tr>
        </thead>
        <tbody>
          {internalList.flatMap((item, index) => (
            <tr
              onClick={() => {
                history.push(`/quality-control-details/${item.id}`);
              }}
              key={`${item.id}-${index}`}
              style={{
                borderLeft: `15px solid ${
                  item.qualityOK ? colors.success : colors.danger
                }`,
              }}
            >
              <td>{item.id}</td>
              <td>{item.lineName}</td>
              <td>{item.qualityOK ? "OK" : "NOK"}</td>
              <td>{item.inspector}</td>
              <td>{translateProdUserRole(item.inspectorRole)}</td>
              <td>{dateFormatter(item.creationDate)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default QualityControlList;
