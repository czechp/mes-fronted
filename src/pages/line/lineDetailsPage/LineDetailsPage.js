import axios from "axios";
import React, { useEffect, useState } from "react";

import "../../../GlobalStyle.css";
import { useParams } from "react-router-dom";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import LineDetailsInfo from "./LineDetailsBasicInfo";
import LineReportInfo from "../../report/reportInfo/ReportInfo";
import LineDetailsMenu from "./LineDetailsMenu";
import LineDetailsBreakdowns from "./LineDetailsBreakdowns";

const LineDetailsPage = () => {
  // @ts-ignore
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [line, setLine] = useState({
    id: 0,
    name: "",
    currentCounter: 0,
    productName: "",
    operator: "",
    productionType: "",
    workingHours: "",
    lineStatus: "",
    rfidReaderError: "",
    opcUaCommunicationError: "",
    activeReport: {},
    activeBreakdowns: []
  });

  const getLine = () => {
    axios
      .get(BASE_URL + "/lines/" + id)
      .then((response) => {
        setLine(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
        setLoaded(false);
      });
  };

  useEffect(() => {
    getLine();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-style">
      {loaded && (
        <div className="">
          <TitleComponent title={"Szczegóły lini: " + line.name} />
          <LineDetailsMenu lineId={id} />
          <div className="page-wrapper">
            <LineDetailsInfo line={line} />
            <LineDetailsBreakdowns breakdowns={line.activeBreakdowns} />
            <LineReportInfo report={line.activeReport} />
          </div>
          <StatementComponent statement={statement} />
        </div>
      )}

      {!loaded && (
        <div className="">
          <LoadSpinnerComponent />
        </div>
      )}
    </div>
  );
};


export default LineDetailsPage;
