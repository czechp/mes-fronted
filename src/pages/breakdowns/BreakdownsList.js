import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import ColorExplanation from "components/ColorExplanation/ColorExplanation";
import colors from "configuration/colors";
import {
  sortArrayByDate,
  sortArrayByNumber,
  sortArrayByString,
  translateBreakdownsStatus,
} from "utilities/commonUtilities";
import dateFormatter from "utilities/dateFormatter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BreakdownList = ({ breakdowns, style={} }) => {
  const [internalBreakdowns, setInternalBreakdowns] = useState([]);
  const [sortingMultiplier, setSortinMultiplier] = useState(-1);
  const history = useHistory();

  const togglerSortMultiplier = () => {
    setSortinMultiplier(-1 * sortingMultiplier);
  };

  const determineBreakdownColor = (status) => {
    switch (status) {
      case "NEW":
        return colors.danger;
      case "IN_PROGRESS":
        return colors.warning;
      case "CLOSE":
        return colors.success;
      default:
        return colors.primary;
    }
  };

  const sortByIdOnClick = () => {
    sortArrayByNumber(
      breakdowns,
      "id",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  };

  const sortByLineNameOnClick = ()=>{
    sortArrayByString(
      breakdowns,
      "lineName",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  }
  const sortByStatusOnClick = () => {
    sortArrayByString(
      breakdowns,
      "breakdownStatus",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  };

  const sortByCreationDateOnClick = () => {
    sortArrayByDate(
      breakdowns,
      "creationDate",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  };

  const sortByMaintenanceArrivedTimeOnClick = () => {
    sortArrayByDate(
      breakdowns,
      "maintenanceArrivedTime",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  };

  const sortByOperatorNameOnClick = () => {
    sortArrayByString(
      breakdowns,
      "operatorName",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  };

  const sortByMaintenanceNameOnClick = () => {
    sortArrayByString(
      breakdowns,
      "maintenanceName",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  };

  const sortByMaintenanceArrivedTotalTimeOnClick = () => {
    sortArrayByNumber(
      breakdowns,
      "maintenanceArrivedTotalTime",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  };

  const sortByBreakdownTotalTimeOnClick = () => {
    sortArrayByNumber(
      breakdowns,
      "breakdownTotalTime",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  };

  const sortByUmupNumberOnClick = () => {
    sortArrayByString(
      breakdowns,
      "umupNumber",
      sortingMultiplier,
      setInternalBreakdowns,
      togglerSortMultiplier
    );
  };

  useEffect(() => {
    setInternalBreakdowns(breakdowns);
  }, [breakdowns]);
  return (
    <div className="" style={{...styles.container, ...style}}>
      <BreakdownColorExplanation />
      <Table variant="dark">
        <thead>
          <tr>
            <th onClick={() => sortByIdOnClick()}>Id:</th>
            <th onClick={() => sortByLineNameOnClick()}>Linia:</th>
            <th onClick={() => sortByStatusOnClick()}>Status:</th>
            <th onClick={() => sortByCreationDateOnClick()}>
              Czas zgłoszenia:
            </th>
            <th onClick={() => sortByMaintenanceArrivedTimeOnClick()}>
              Czas przybycia UR:
            </th>
            <th onClick={() => sortByOperatorNameOnClick()}>Zgłaszający:</th>
            <th onClick={() => sortByMaintenanceNameOnClick()}>
              Pracownik UR:
            </th>
            <th onClick={() => sortByMaintenanceArrivedTotalTimeOnClick()}>
              Minut do przybycia UR:
            </th>
            <th onClick={() => sortByBreakdownTotalTimeOnClick()}>
              Czas awarii:
            </th>
            <th onClick={() => sortByUmupNumberOnClick()}>Nr. UMUP</th>
          </tr>
        </thead>
        <tbody>
          {breakdowns.map((breakdown) => (
            <tr
              key={breakdown.id}
              style={{
                borderLeft: `15px solid ${determineBreakdownColor(
                  breakdown.breakdownStatus
                )}`,
              }}
              onClick={() => {
                history.push(`/breakdown/${breakdown.id}`);
              }}
            >
              <td>{breakdown.id}</td>
              <td>{breakdown.lineName}</td>
              <td>{translateBreakdownsStatus(breakdown.breakdownStatus)}</td>
              <td>{dateFormatter(breakdown.creationDate)}</td>
              <td>
                {breakdown.maintenanceArrivedTime
                  ? dateFormatter(breakdown.maintenanceArrivedTime)
                  : "Oczekiwanie na przybycie"}
              </td>
              <td>{breakdown.operatorName}</td>
              <td>
                {breakdown.maintenanceName
                  ? breakdown.maintenanceName
                  : "Oczekiwanie na przybycie"}
              </td>
              <td>{`${breakdown.maintenanceArrivedTotalTime} min`}</td>
              <td>{`${breakdown.breakdownTotalTime} min`}</td>
              <td>{breakdown.umupNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const BreakdownColorExplanation = () => {
  return (
    <ColorExplanation
      title="Awarie"
      data={[
        { text: "Oczekiwanie na UR", color: colors.danger },
        { text: "Usuwanie awarii", color: colors.warning },
        { text: "Zakończona", color: colors.success },
      ]}
    />
  );
};

const styles = {
  container: {
    width: "100%",
    marginTop: "100px",
  },
};

export default BreakdownList;
