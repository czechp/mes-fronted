import axios from "axios";

import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { httpErrorHandler } from "services/HttpService";

import { BASE_URL } from "services/URL";
import "../../../GlobalStyle.css";
import ReportInfo from "../reportInfo/ReportInfo";
import "./ReportDetailsPage.css";
import ReportDetailsRemoveForm from "./ReportDetailsRemoveForm";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";

const ReportDetailsPage = () => {
  //@ts-ignore
  const { reportId } = useParams();
  const history = useHistory();
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [loaded, setLoaded] = useState(false);

  const [report, setReport] = useState();

  const getReportRequest = () => {
    setLoaded(false);
    axios
      .get(`${BASE_URL}/reports/${reportId}`)
      .then((response) => {
        setReport(response.data);
      })
      .catch((error) => setStatement(httpErrorHandler(error)))
      .finally(() => {
        setLoaded(true);
      });
  };

  const deleteReportRequest = () => {
    axios
      .delete(`${BASE_URL}/reports/${reportId}`)
      .then((response) => {
        setStatement({
          content:
            "Raport usunięty. Zostaniesz przekierowany do listy raportów.",
          isError: false,
        });
        setTimeout(() => {
          history.push("/reports/all");
        }, 1500);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  useEffect(() => {
    getReportRequest();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-style">
      <TitleComponent title="Raport - szczegóły" />
      {loaded && (
        <div className="page-wrapper">
          <ReportInfo report={report} />
          {report && (
            <ReportDetailsRemoveForm
              reportId={reportId}
              deleteReport={deleteReportRequest}
            />
          )}
        </div>
      )}
      {!loaded && <LoadSpinnerComponent />}
      <StatementComponent statement={statement} />
    </div>
  );
};

export default ReportDetailsPage;
