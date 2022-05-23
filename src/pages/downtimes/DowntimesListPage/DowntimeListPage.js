import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "services/URL";
import TitleComponent from "components/Title/TitleComponent";
import { useState } from "react";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import axios from "axios";
import StatementComponent from "components/Statement/StatementCompnent";
import { httpErrorHandler } from "services/HttpService";
import { useEffect } from "react";
import DowntimesList from "../DowntimesList";
import TextInput from "components/TextInput/TextInput";
import dateFormatter from "utilities/dateFormatter";
import { Button } from "react-bootstrap";

const DowntimesListPage = () => {
  // @ts-ignore
  const { query } = useParams();
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [dataLoaded, setDataloaded] = useState(false);
  const [downtimes, setDowntimes] = useState([]);
  const [filteredDowntimes, setFilteredDowntimes] = useState();

  const URL = `${BASE_URL}/downtimes-executed${
    query === "all" ? "" : `/line/${query}`
  }`;



  const getDowntimesRequest = () => {
    axios
      .get(URL)
      .then((response) => {
        setDowntimes(response.data);
        setFilteredDowntimes(response.data);
        setDataloaded(true);
      })
      .catch((error) => setStatement(httpErrorHandler(error)));
  };

  useEffect(() => {
    getDowntimesRequest();
  }, []);

  return (
    <div className="page-style">
      <TitleComponent title={"Lista przestojów produkcyjnych"} />
      {dataLoaded && (
        <div className="page-wrapper">
          <FilterForm
            downtimes={downtimes}
            filteredDowntimes={filteredDowntimes}
            setFilteredDowntimes={setFilteredDowntimes}
          />
          <FilteredDowntimesList downtimes={filteredDowntimes} />
        </div>
      )}

      {!dataLoaded && <LoadSpinnerComponent />}
      <StatementComponent statement={statement} />
    </div>
  );
};

const FilteredDowntimesList = ({ downtimes }) => {
  // @ts-ignore
  return <DowntimesList downtimes={downtimes} style={{marginTop: "0px"}} />;
};

const FilterForm = ({ downtimes, filteredDowntimes, setFilteredDowntimes }) => {
  const [firstFilter, setFirstFilter] = useState({
    value: "",
    valid: false,
  });

  const [secondFilter, setSecondFilter] = useState({
    value: "",
    valid: false,
  });

  const predictMatchedDowntime = (text, item) => {
    return (
      item.id === text ||
      item.content.includes(text) ||
      item.operatorName.includes(text) ||
      dateFormatter(item.creationDate).includes(text) ||
      dateFormatter(item.closeDate).includes(text) ||
      item.totalMinutes === text
    );
  };

  const filterFirstOnChange = (text) => {
    if (text !== "") {
      const resultFirstFilter = downtimes.filter((item) => {
        return predictMatchedDowntime(text, item);
      });
      setFilteredDowntimes(resultFirstFilter);
    } else setFilteredDowntimes(downtimes);
  };

  const filterSecondOnChange = (text) => {
    if (text !== "") {
      const resultFirstFilter = filteredDowntimes.filter((item) => {
        return predictMatchedDowntime(text, item);
      });
      setFilteredDowntimes(resultFirstFilter);
    } else setFilteredDowntimes(downtimes);
  };

  const clearFiltersOnClick = () => {
    setFirstFilter({ value: "", valid: false });
    setSecondFilter({ value: "", valid: false });
    setFilteredDowntimes(downtimes);
  };

  return (
    <div className="" style={{ width: "30%" }}>
      <TextInput
        label="Filter I"
        onAssign={setFirstFilter}
        value={firstFilter.value}
        placeholder="Wpisz fraze aby przefiltrować wyniki"
        onChange={filterFirstOnChange}
      />

      <TextInput
        label="Filter II"
        onAssign={setSecondFilter}
        value={secondFilter.value}
        placeholder="Wpisz fraze aby przefiltrować wyniki po pierwszym filtrze"
        onChange={filterSecondOnChange}
      />

      <Button onClick={clearFiltersOnClick} variant="outline-warning" style={{ width: "100%" }}>
        Wyczyść
      </Button>
    </div>
  );
};

export default DowntimesListPage;
