import axios from "axios";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import { dateToIsoString, dateToReadableDate } from "utilities/dateFormatter";

import "../../../GlobalStyle.css";
import ReportColorExplanation from "../ReportColorExplanation";
import ReportsListTable from "./ReportsListTable";

const ReportListPage = () => {
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [loaded, setLoaded] = useState(false);
  // @ts-ignore
  const { query } = useParams();
  const [filteredReports, setFitleredReports] = useState([]);
  const [reports, setReports] = useState([]);
  const [line, setLine] = useState({ name: "" });

  const pageTitle =
    query === "all"
      ? "Raporty - wszystkie linie"
      : `Raport linia - ${line.name}`;

  const specifiedURL =
    query === "all"
      ? `${BASE_URL}/reports`
      : `${BASE_URL}/reports/line/${query}`;

  const specifiedDateURL =
    query === "all"
      ? `${BASE_URL}/reports/creationDate`
      : `${BASE_URL}/reports/line/creationDate/${query}`;


  const specifiedSpreadSheetURL =
    query === "all"
      ? `${BASE_URL}/reports/line/creationDate/spreadsheet`
      : `${BASE_URL}/reports/line/creationDate/spreadsheet/${query}`;

  const getReportsRequest = () => {
    axios
      .get(specifiedURL)
      .then((response) => {
        setReports(response.data);
        setFitleredReports(response.data);
      })
      .catch((error) => setStatement(httpErrorHandler(error)))
      .finally(() => setLoaded(true));
  };

  const getReportsByDateRequest = (startDate, stopDate) => {
    setLoaded(false);

    axios
      .get(specifiedDateURL, {
        params: {
          start: startDate,
          stop: stopDate,
        },
      })
      .then((response) => {
        setReports(response.data);
        setFitleredReports(response.data);
      })
      .catch((error) => setStatement(httpErrorHandler(error)))
      .finally(() => setLoaded(true));
  };

  const getSpreadSheetRequest = (startDate, stopDate) => {
    const fileName = `Raproty___${dateToReadableDate(startDate)}___${dateToReadableDate(
      stopDate
    )}.xlsx`;
    setLoaded(false);
    axios
      .get(specifiedSpreadSheetURL, {
        responseType: "blob",
        params: { start: startDate, stop: stopDate },
      })
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileName); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
        console.log(error);
      })
      .finally(() => setLoaded(true));
  };

  const getLineInfoRequest = () => {
    axios
      .get(`${BASE_URL}/lines/${query}`)
      .then((response) => {
        setLine(response.data);
      })
      .catch((error) => setStatement(httpErrorHandler(error)));
  };

  useEffect(() => {
    getReportsRequest();
    if (query !== "all") getLineInfoRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-style">
      <TitleComponent title={pageTitle} />
      {loaded && (
        <div className="page-wrapper">
          <ReportColorExplanation
            title="Produkcja"
            subtitle="( różnica od oczekiwanej )"
          />
          <ReportsListTable
            filteredReports={filteredReports}
            setFilteredReports={setFitleredReports}
            fetchAll={getReportsRequest}
            reports={reports}
            fetchAllByDate={getReportsByDateRequest}
            getSpreadSheet={getSpreadSheetRequest}
          />
        </div>
      )}

      {!loaded && <LoadSpinnerComponent />}
      <StatementComponent statement={statement} />
    </div>
  );
};

export default ReportListPage;
