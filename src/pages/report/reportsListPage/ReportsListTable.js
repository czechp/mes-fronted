import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  sortArrayByDate,
  sortArrayByNumber,
  sortArrayByString,
  translateProductType,
  translateWorkShifts,
} from "utilities/commonUtilities";
import colorSpecifier from "utilities/colorSpecifier";
import dateFormatter, { dateToIsoString } from "utilities/dateFormatter";
import ReportsFilterForm from "./ReportsFilterForm";
import { useHistory } from "react-router-dom";
import InfoSectionComponent, {
  InfoSectionSubtitle,
} from "components/InfoSection/InfoSectionComponent";

const ReportsListTable = ({
  filteredReports,
  setFilteredReports,
  fetchAll,
  fetchAllByDate,
  reports,
  getSpreadSheet,
}) => {
  const [sortMultiplier, setSortMultiplier] = useState(-1);
  const toggleMultiplier = () => {
    setSortMultiplier(sortMultiplier * -1);
  };

  const history = useHistory();

  const sortByIdOnClick = () => {
    sortArrayByNumber(
      filteredReports,
      "id",
      sortMultiplier,
      setFilteredReports,
      toggleMultiplier
    );
  };

  const sortByProductTypeOnClick = () => {
    sortArrayByString(
      filteredReports,
      "productType",
      sortMultiplier,
      setFilteredReports,
      toggleMultiplier
    );
  };

  const sortByProductNameOnClick = () => {
    sortArrayByString(
      filteredReports,
      "productName",
      sortMultiplier,
      setFilteredReports,
      toggleMultiplier
    );
  };

  const sortByLineOnClick = () => {
    sortArrayByString(
      filteredReports,
      "lineName",
      sortMultiplier,
      setFilteredReports,
      toggleMultiplier
    );
  };

  const sortByCreationDateOnClick = () => {
    sortArrayByDate(
      filteredReports,
      "creationDate",
      sortMultiplier,
      setFilteredReports,
      toggleMultiplier
    );
  };

  const sortByAmountOnClick = () => {
    sortArrayByNumber(
      filteredReports,
      "amount",
      sortMultiplier,
      setFilteredReports,
      toggleMultiplier
    );
  };

  const sortByWorkShiftOnClick = () => {
    sortArrayByString(
      filteredReports,
      "reportWorkShift",
      sortMultiplier,
      setFilteredReports,
      toggleMultiplier
    );
  };

  const sortByTrashAmountOnClick = () => {
    sortArrayByNumber(
      filteredReports,
      "trashAmount",
      sortMultiplier,
      setFilteredReports,
      toggleMultiplier
    );
  };

  const sortByOperatorOnClick = () => {
    sortArrayByString(
      filteredReports,
      "createOperator",
      sortMultiplier,
      setFilteredReports,
      toggleMultiplier
    );
  };

  const sortByOeeOnClick = () => {
    setFilteredReports(
      filteredReports.sort((x1, x2) => {
        toggleMultiplier();
        return sortMultiplier * (x1.statistics.oee - x2.statistics.oee);
      })
    );
  };

  return (
    <div className="" style={{ width: "100%" }}>
      <ReportStatisticsSection reports={filteredReports} />
      <ReportListDateFilter
        fetchByDate={fetchAllByDate}
        getSpreadSheet={getSpreadSheet}
      />
      <ReportsFilterForm
        filteredReports={filteredReports}
        setFilteredReports={setFilteredReports}
        fetchAll={fetchAll}
        reports={reports}
      />
      <Table variant="dark" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th onClick={sortByIdOnClick}>Id:</th>
            <th onClick={sortByLineOnClick}>Linia:</th>
            <th onClick={sortByProductTypeOnClick}>Dział:</th>
            <th onClick={sortByProductNameOnClick}>Produkt:</th>
            <th onClick={sortByCreationDateOnClick}>Data:</th>
            <th onClick={sortByWorkShiftOnClick}>Zmiana:</th>
            <th onClick={sortByOeeOnClick}>OEE [%]:</th>
            <th onClick={sortByAmountOnClick}>Ilość (Oczekiwana): [szt.]</th>
            <th onClick={sortByTrashAmountOnClick}>Odpad: [szt.]</th>
            <th onClick={sortByAmountOnClick}>Ilość (Oczekiwana): [%]</th>
            <th onClick={sortByOperatorOnClick}>Operator:</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, idx) => (
            <tr
              onClick={() => {
                history.push(`/report-details/${report.id}`);
              }}
              key={`${report.id}-${idx}`}
              style={{
                borderLeft: `15px solid ${colorSpecifier.report(
                  report.statistics.currentProductionPercent,
                  report.statistics.expectedProductionPercent
                )}`,
              }}
            >
              <td>{report.id}</td>
              <td>{report.lineName}</td>
              <td>{translateProductType(report.productType)}</td>
              <td>{report.productName}</td>
              <td>{dateFormatter(report.creationDate)}</td>
              <td>{translateWorkShifts(report.reportWorkShift)}</td>
              <td>{report.statistics.oee}</td>
              <td>{`${report.amount} (${report.statistics.expectedProduction})`}</td>
              <td>{report.trashAmount}</td>
              <td>{`${report.statistics.currentProductionPercent.toFixed(
                2
              )} (${report.statistics.expectedProductionPercent.toFixed(
                2
              )})`}</td>
              <td>{report.createOperator}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const ReportStatisticsSection = ({ reports = [] }) => {
  let avgWorkingTime = 0.0;
  let avgRealWorkingTime = 0.0;
  let avgStopTotalTime = 0.0;
  let avgExpectProductionPercent = 0.0;
  let avgRealProductionPercent = 0.0;
  let avgOee = 0;

  let totalWorkingTime = 0.0;
  let totalRealWorkingTime = 0.0;
  let totalStopTotalTime = 0.0;

  if (reports.length > 0) {
    avgWorkingTime =
      reports
        .map((r) => r.statistics.workingTime.hoursDecimal)
        .reduce((previous, current, index, array) => previous + current) /
      reports.length;

    avgRealWorkingTime =
      reports
        .map((r) => r.statistics.workingTimeWithoutStop.hoursDecimal)
        .reduce((previous, current, index, array) => previous + current) /
      reports.length;

    avgStopTotalTime =
      reports
        .map(
          (r) =>
            r.statistics.totalDowntimes.hoursDecimal +
            r.statistics.totalBreakdowns.hoursDecimal
        )
        .reduce((previous, current, index, array) => previous + current) /
      reports.length;

    avgExpectProductionPercent =
      reports
        .map((r) => r.statistics.expectedProductionPercent)
        .reduce((previous, current, index, array) => previous + current) /
      reports.length;

    avgRealProductionPercent =
      reports
        .map((r) => r.statistics.currentProductionPercent)
        .reduce((previous, current, index, array) => previous + current) /
      reports.length;

    avgOee =
      reports
        .map((r) => r.statistics.oee)
        .reduce((previous, current, index, array) => previous + current) /
      reports.length;

    totalWorkingTime = reports
      .map((r) => r.statistics.workingTime.hoursDecimal)
      .reduce((previous, current, index, array) => previous + current);

    totalRealWorkingTime = reports
      .map((r) => r.statistics.workingTimeWithoutStop.hoursDecimal)
      .reduce((previous, current, index, array) => previous + current);

    totalStopTotalTime = reports
      .map(
        (r) =>
          r.statistics.totalDowntimes.hoursDecimal +
          r.statistics.totalBreakdowns.hoursDecimal
      )
      .reduce((previous, current, index, array) => previous + current);
  }

  return (
    <div className="">
      <InfoSectionComponent title="Statystyki">
        <InfoSectionSubtitle title="Ogólne" />
        <p className="info-form-row-style">
          <span>Ilość raportów:</span>
          <span>{`${reports.length} szt.`}</span>
        </p>

        <InfoSectionSubtitle title="Średnie" />
        <p className="info-form-row-style">
          <span>Czas pracy:</span>
          <span>{`${avgWorkingTime.toFixed(2)} h`}</span>
        </p>
        <p className="info-form-row-style">
          <span>Rzeczywisty czas pracy:</span>
          <span>{`${avgRealWorkingTime.toFixed(2)} h`}</span>
        </p>

        <p className="info-form-row-style">
          <span>Czas awarii i postojów:</span>
          <span>{`${avgStopTotalTime.toFixed(2)} h`}</span>
        </p>

        <p className="info-form-row-style">
          <span>Oczekiwana produkcja:</span>
          <span>{`${avgExpectProductionPercent.toFixed(2)} %`}</span>
        </p>

        <p className="info-form-row-style">
          <span>Rzeczywista produkcja:</span>
          <span>{`${avgRealProductionPercent.toFixed(2)} %`}</span>
        </p>

        <p className="info-form-row-style">
          <span>OEE:</span>
          <span>{`${avgOee.toFixed(0)} %`}</span>
        </p>

        <InfoSectionSubtitle title="Sumy" />

        <p className="info-form-row-style">
          <span>Czas pracy:</span>
          <span>{`${totalWorkingTime.toFixed(2)} h`}</span>
        </p>
        <p className="info-form-row-style">
          <span>Rzeczywisty czas pracy:</span>
          <span>{`${totalRealWorkingTime.toFixed(2)} h`}</span>
        </p>

        <p className="info-form-row-style">
          <span>Czas awarii i postojów:</span>
          <span>{`${totalStopTotalTime.toFixed(2)} h`}</span>
        </p>
      </InfoSectionComponent>
    </div>
  );
};

const ReportListDateFilter = ({ fetchByDate, getSpreadSheet }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [stopDate, setStopDate] = useState(new Date());

  const fetchByDateOnClick = () => {
    fetchByDate(startDate, stopDate);
  };

  const getSpreadSheetOnClick = () => {
    getSpreadSheet(startDate, stopDate);
  };

  return (
    <div className="" style={{ width: "100%" }}>
      <h3>Filtr czasowy</h3>
      <div
        className=""
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <p>
          Data rozpoczęcia:
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
        </p>
        <p>
          Data zakończenia:
          <DatePicker
            selected={stopDate}
            onChange={(date) => {
              setStopDate(date);
            }}
          />
        </p>
      </div>
      <div
        className=""
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Button
          variant="outline-primary"
          style={{ width: "40%", marginBottom: "40px", marginTop: "40px" }}
          onClick={fetchByDateOnClick}
        >
          Wyszukaj
        </Button>
        <Button
          variant="outline-primary"
          style={{ width: "40%" }}
          onClick={getSpreadSheetOnClick}
        >
          Generuj arkusz kalkulacyjny
        </Button>
      </div>
    </div>
  );
};
export default ReportsListTable;
