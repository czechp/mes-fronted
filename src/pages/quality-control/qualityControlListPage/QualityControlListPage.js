import axios from "axios";
import TitleComponent from "components/Title/TitleComponent";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

import "../../../GlobalStyle.css";

import { BASE_URL } from "services/URL";
import StatementComponent from "components/Statement/StatementCompnent";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import { httpErrorHandler } from "services/HttpService";
import QualityControlList from "../qualityControlList/QualityControlsList";
import TextInput from "components/TextInput/TextInput";
import { translateProdUserRole } from "utilities/commonUtilities";
import dateFormatter from "utilities/dateFormatter";

const QualityControlListPage = () => {
  // @ts-ignore
  const { query } = useParams();
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [qualityControls, setQualityControls] = useState([]);
  const [filteredControls, setFilteredControls] = useState([]);

  const [lineInfo, setLineInfo] = useState({ name: "" });
  const [loaded, setLoaded] = useState(false);
  const lineId = query !== "all" ? query : null;
  const title =
    "Kontrole jakości - " +
    (lineId ? `linia ${lineInfo.name}` : "wszystkie linie");

  const getQualityControlsRequest = (onlyNok = false) => {
    const url = `${BASE_URL}/quality-controls/${
      lineId ? `line/${lineId}` : ""
    }`;
    setLoaded(false);

    axios
      .get(url, { params: { onlyNok } })
      .then((response) => {
        setQualityControls(response.data);
        setFilteredControls(response.data);
      })
      .catch((error) => {
        setStatement(httpErrorHandler);
      })
      .finally(() => {
        setLoaded(true);
      });
  };

  const getLineInfoRequest = () => {
    axios
      .get(`${BASE_URL}/lines/${lineId}`)
      .then((response) => {
        setLineInfo(response.data);
      })
      .catch((error) => {
        setStatement(httpErrorHandler);
      });
  };

  useEffect(() => {
    getQualityControlsRequest(true);
    if (lineId) getLineInfoRequest();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-style">
      <TitleComponent title={title} />

      {!loaded && <LoadSpinnerComponent />}
      {loaded && (
        <div className="page-wrapper">
          <ChooseSection getQualityControls={getQualityControlsRequest} />
          <FitlerSection
            onAssign={setFilteredControls}
            qualityControls={qualityControls}
            filteredControls={filteredControls}
          />
          <QualityControlList qualityControls={filteredControls} />
        </div>
      )}
      <StatementComponent statement={statement} />
    </div>
  );
};

const FitlerSection = ({ qualityControls, filteredControls, onAssign }) => {
  const [firstFilter, setFirstFilter] = useState({ value: "", valid: true });
  const [secondFilter, setSecondFilter] = useState({ value: "", valid: true });

  const dataFilter = (text, source, onAssign) => {
    if (text === "") onAssign(source);
    else if (text === "OK" || text === "NOK") {
      const controlResult = text === "OK";
      onAssign(source.filter((item) => item.qualityOK === controlResult));
    } else {
      const filteredData = source.filter((item) => {
        return (
          item.id.toString().includes(text) ||
          item.inspector.includes(text) ||
          item.lineName.includes(text) ||
          translateProdUserRole(item.inspectorRole).includes(text) ||
          dateFormatter(item.creationDate).includes(text)
        );
      });
      onAssign(filteredData);
    }
  };

  const firstFilterOnChange = (text) => {
    dataFilter(text, qualityControls, onAssign);
  };

  const secondFilterOnChange = (text) => {
    dataFilter(text, filteredControls, onAssign);
  };

  const clearFilters = () => {
    setFirstFilter({ ...firstFilter, value: "" });
    setSecondFilter({ ...secondFilter, value: "" });
    onAssign(qualityControls);
  };

  return (
    <div className="form-style">
      <TextInput
        label="Filtr I:"
        onAssign={setFirstFilter}
        value={firstFilter.value}
        onChange={firstFilterOnChange}
        placeholder="Wpisz fraze aby przefiltrować wszystkie wyniki"
      />
      <TextInput
        label="Filtr II:"
        onAssign={setSecondFilter}
        value={secondFilter.value}
        onChange={secondFilterOnChange}
        placeholder="Wpisz fraze aby przefiltrować po pierwszym filtrze"
      />
      <Button
        variant="outline-warning"
        style={{ width: "100%" }}
        onClick={clearFilters}
      >
        Wyczyść
      </Button>
    </div>
  );
};

const ChooseSection = ({ getQualityControls }) => {
  return (
    <div className="" style={{ width: "100%", marginBottom: 50 }}>
      <h2>Typ kontroli:</h2>
      <div
        className=""
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginTop: 50,
        }}
      >
        <Button
          style={{ width: "30%" }}
          variant="outline-danger"
          onClick={() => getQualityControls(true)}
        >
          NOK
        </Button>
        <Button
          style={{ width: "30%" }}
          variant="outline-primary"
          onClick={() => getQualityControls(false)}
        >
          Wszystkie
        </Button>
      </div>
    </div>
  );
};
export default QualityControlListPage;
