import TextInput from "components/TextInput/TextInput";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { translateWorkShifts } from "utilities/commonUtilities";
import dateFormatter from "utilities/dateFormatter";
import "../../../GlobalStyle.css";

const ReportsFilterForm = ({
  setFilteredReports,
  filteredReports,
  fetchAll,
  reports,
}) => {
  const [filterTextFirst, setFilterTextFirst] = useState({
    value: "",
    valid: true,
  });

  const [filterTextSecond, setFilterTextSecond] = useState({
    value: "",
    valid: true,
  });

  const filterFirst = (text) => {
    if (text === "") setFilteredReports(reports);
    else {
      const afterFilter = reports.filter((report) => {
        return (
          report.lineName.includes(text) ||
          report.productType.includes(text) ||
          report.productName.includes(text) ||
          translateWorkShifts(report.reportWorkShift).includes(text) ||
          report.createOperator.includes(text) ||
          dateFormatter(report.creationDate).includes(text)
        );
      });

      setFilteredReports(afterFilter);
    }
  };

  const filterSecond = (text) => {
    const afterFilter = filteredReports.filter((report) => {
      return (
        report.lineName.includes(text) ||
        report.productType.includes(text) ||
        report.productName.includes(text) ||
        translateWorkShifts(report.reportWorkShift).includes(text) ||
        report.createOperator.includes(text) ||
        dateFormatter(report.creationDate).includes(text)
      );
    });

    setFilteredReports(afterFilter);
  };

  const clearFiltersOnClick = () => {
    fetchAll();
    setFilterTextFirst({ value: "", valid: true });
    setFilterTextSecond({ value: "", valid: true });
  };

  return (
    <div className="center-container">
      <div className="form-style">
        <TextInput
          value={filterTextFirst.value}
          label="Filtr I:"
          onAssign={setFilterTextFirst}
          onChange={filterFirst}
          placeholder="Wpisz fraze aby przefiltrować wszystkie wyniki"
        />

        <TextInput
          value={filterTextSecond.value}
          label="Filtr II:"
          onAssign={setFilterTextSecond}
          onChange={filterSecond}
          placeholder="Wpisz fraze aby przefiltrować wyniki po pierwszym filtrze"

        />
        <Button
          variant="outline-warning"
          style={{ width: "100%" }}
          onClick={clearFiltersOnClick}
        >
          Wyczyść
        </Button>
      </div>
    </div>
  );
};

export default ReportsFilterForm;
