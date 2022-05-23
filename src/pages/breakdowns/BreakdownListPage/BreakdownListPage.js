import axios from "axios";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import TextInput from "components/TextInput/TextInput";
import TitleComponent from "components/Title/TitleComponent";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import { translateBreakdownsStatus } from "utilities/commonUtilities";
import dateFormatter from "utilities/dateFormatter";
import BreakdownList from "../BreakdownsList";

const BreakdownListPage = () => {
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });

  //@ts-ignore
  const { query } = useParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [breakdowns, setBreakdowns] = useState([]);
  const [filteredBreakdowns, setFilteredBreakdowns] = useState([]);

  const URL =
    query === "all"
      ? `${BASE_URL}/breakdowns`
      : `${BASE_URL}/breakdowns/line/${query}`;

  const getBreakdownsRequest = () => {
    setDataLoaded(false);
    axios
      .get(URL)
      .then((response) => {
        setBreakdowns(response.data);
        setFilteredBreakdowns(response.data);
      })
      .catch((error) => httpErrorHandler(error))
      .finally(() => {
        setDataLoaded(true);
      });
  };

  useEffect(() => {
    getBreakdownsRequest();
  }, []);

  return (
    <div className="page-style">
      <TitleComponent title="Lista awarii" />
      {dataLoaded && (
        <div className="page-wrapper">
          <BreakdownListFilterForm
            breakdowns={breakdowns}
            filteredBreakdowns={filteredBreakdowns}
            setFilteredBreakdowns={setFilteredBreakdowns}
          />
          <BreakdownList
            breakdowns={filteredBreakdowns}
            style={{ marginTop: "0px" }}
          />
        </div>
      )}
      {!dataLoaded && <LoadSpinnerComponent />}
    </div>
  );
};

const BreakdownListFilterForm = ({
  breakdowns,
  filteredBreakdowns,
  setFilteredBreakdowns,
}) => {
  const [firstFilter, setFirstFilter] = useState({ value: "", valid: true });
  const [secondFilter, setSecondFilter] = useState({ value: "", valid: true });

  const breakdownsContainsText = (breakdownsArray, text) => {
    return breakdownsArray.filter((b) => {
      return (
        b.id === parseInt(text) ||
        b.lineName.includes(text) ||
        translateBreakdownsStatus(b.breakdownStatus).includes(text) ||
        dateFormatter(b.creationDate).includes(text) ||
        dateFormatter(b.maintenanceArrivedTime).includes(text) ||
        b.operatorName.includes(text) ||
        b.maintenanceName.includes(text) ||
        b.umupNumber.includes(text)
      );
    });
  };

  const firstFilterOnChange = (text) => {
    setFilteredBreakdowns(breakdownsContainsText(breakdowns, text));
    if (text === "") setFilteredBreakdowns(breakdowns);
  };

  const secondFilterOnChange = (text) => {
    setFilteredBreakdowns(breakdownsContainsText(filteredBreakdowns, text));
  };

  const clearFilters = () => {
    setFilteredBreakdowns(breakdowns);
    setFirstFilter({value: "", valid:false});
    setSecondFilter({value: "", valid:false});
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

export default BreakdownListPage;
