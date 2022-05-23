import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";

import {
  sortArrayByDate,
  sortArrayByNumber,
  sortArrayByString,
} from "utilities/commonUtilities";
import dateFormatter from "utilities/dateFormatter";
import ColorExplanation from "components/ColorExplanation/ColorExplanation";
import colors from "configuration/colors";
import { useHistory } from "react-router-dom";

const DowntimesList = ({ downtimes, style = [] }) => {
  const [internalDowntimes, setInternalDowntimes] = useState([]);
  const [sortMultiplier, setSortMultiplier] = useState(-1);
  const history = useHistory();
  const toggleSortMultiplier = () => {
    setSortMultiplier(-1 * sortMultiplier);
  };



  const sortByIdOnClick = () => {
    sortArrayByNumber(
      internalDowntimes,
      "id",
      sortMultiplier,
      setInternalDowntimes,
      toggleSortMultiplier
    );
  };

  const sortByContentOnClick = () => {
    sortArrayByString(
      internalDowntimes,
      "content",
      sortMultiplier,
      setInternalDowntimes,
      toggleSortMultiplier
    );
  };

  const sortByOperatorNameOnClick = () => {
    sortArrayByString(
      internalDowntimes,
      "operatorName",
      sortMultiplier,
      setInternalDowntimes,
      toggleSortMultiplier
    );
  };

  const sortByCreationDateOnClick = () => {
    sortArrayByDate(
      internalDowntimes,
      "creationDate",
      sortMultiplier,
      setInternalDowntimes,
      toggleSortMultiplier
    );
  };

  const sortByPersistTimeOnClick = () => {
    sortArrayByNumber(
      internalDowntimes,
      "totalMinutes",
      sortMultiplier,
      setInternalDowntimes,
      toggleSortMultiplier
    );
  };

  useEffect(() => {
    setInternalDowntimes(downtimes);
  }, [downtimes]);

  return (
    <div
      className=""
      // @ts-ignore
      style={{ width: "100%", marginTop: "100px", ...style }}
    >
      <DowntimesListColorExplanation />
      <Table variant="dark">
        <thead>
          <tr>
            <th onClick={() => sortByIdOnClick()}>Id:</th>
            <th onClick={() => sortByContentOnClick()}>Opis:</th>
            <th onClick={() => sortByOperatorNameOnClick()}>Operator:</th>
            <th onClick={() => sortByCreationDateOnClick()}>
              Data utworzenia:
            </th>
            <th>Data zakończenia:</th>
            <th onClick={() => sortByPersistTimeOnClick()}>Czas trwania:</th>
          </tr>
        </thead>
        <tbody>
          {internalDowntimes.map((item, idx) => (
            <tr
              key={`${item.id}-${idx}`}
              onClick={() => history.push(`/downtime-details/${item.id}`)}
            >
              <td
                style={{
                  borderLeft: `15px solid ${
                    item.downtimeExecutedState === "CLOSE"
                      ? colors.success
                      : colors.warning
                  }`,
                }}
              >
                {item.id}
              </td>
              <td>{item.content}</td>
              <td>{item.operatorName}</td>
              <td>{dateFormatter(item.creationDate)}</td>
              <td>
                {item.downtimeExecutedState === "CLOSE"
                  ? dateFormatter(item.closeDate)
                  : "Aktywny"}
              </td>
              <td>{`${item.totalMinutes} min`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const DowntimesListColorExplanation = () => {
  return (
    <ColorExplanation
      title="Przestoje produkcyjne"
      data={[
        { text: "Aktywne", color: colors.warning },
        { text: "Zakończone", color: colors.success },
      ]}
    />
  );
};

export default DowntimesList;
