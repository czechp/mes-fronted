import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import "../../../GlobalStyle.css";
import TitleComponent from "components/Title/TitleComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
// @ts-ignore
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { BASE_URL } from "services/URL";
import { httpErrorHandler } from "services/HttpService";
import InfoSectionComponent from "components/InfoSection/InfoSectionComponent";
import { translateBreakdownsStatus } from "utilities/commonUtilities";
import dateFormatter from "utilities/dateFormatter";
import ModalDialogComponent from "components/ModalDialog/ModalDialogComponent";

const BreakdownDetailsPage = ({}) => {
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  // @ts-ignore
  const { id } = useParams();
  const history = useHistory();

  const [breakdown, setBreakdown] = useState();

  const getBreakdownRequest = () => {
    setDataLoaded(false);
    axios
      .get(`${BASE_URL}/breakdowns/${id}`)
      .then((response) => {
        setBreakdown(response.data);
        setDataLoaded(true);
      })
      .catch((error) => setStatement(httpErrorHandler(error)));
  };

  const removeBreakdownRequest = () => {
    axios
      .delete(`${BASE_URL}/breakdowns/${id}`)
      .then((response) => {
        setStatement({
          isError: false,
          content: "Awaria usunięta. Przkierowanie do listy awarii",
        });
        setTimeout(() => {history.push("/breakdowns-list/all")}, 2000);
      })
      .catch((error) => httpErrorHandler(error));
  };
  useEffect(() => {
    getBreakdownRequest();
  }, []);

  return (
    <div className="page-style">
      <TitleComponent title="Awaria - szczegóły" />
      {dataLoaded && (
        <div className="page-wrapper">
          <BreakdownInfo breakdown={breakdown} />
          <BreakdownRemoveForm removeBreakdown={removeBreakdownRequest} />
        </div>
      )}
      {!dataLoaded && <LoadSpinnerComponent />}
      <StatementComponent statement={statement} />
    </div>
  );
};

const BreakdownInfo = ({ breakdown }) => {
  return (
    <InfoSectionComponent>
      <div className="info-form-row-style">
        <span>Id:</span>
        <span>{breakdown.id}</span>
      </div>

      <div className="info-form-row-style">
        <span>Status:</span>
        <span>{translateBreakdownsStatus(breakdown.breakdownStatus)}</span>
      </div>

      <div className="info-form-row-style">
        <span>Zgłaszający:</span>
        <span>{breakdown.operatorName}</span>
      </div>

      <div className="info-form-row-style">
        <span>Pracownik UR:</span>
        <span>
          {breakdown.maintenanceName
            ? breakdown.maintenanceName
            : "Oczekiwanie na przybycie pracownika UR"}
        </span>
      </div>

      <div className="info-form-row-style">
        <span>Data zgłoszenia:</span>
        <span>{dateFormatter(breakdown.creationDate)}</span>
      </div>

      <div className="info-form-row-style">
        <span>Data zakończenia:</span>
        <span>{dateFormatter(breakdown.closeDate)}</span>
      </div>

      <div className="info-form-row-style">
        <span>Data przybycia UR:</span>
        <span>{dateFormatter(breakdown.maintenanceArrivedTime)}</span>
      </div>

      <div className="info-form-row-style">
        <span>Czas do przybycia UR:</span>
        <span>{`${breakdown.maintenanceArrivedTotalTime}`}</span>
      </div>

      <div className="info-form-row-style">
        <span>Całkowity czas awarii:</span>
        <span>{`${breakdown.breakdownTotalTime}`}</span>
      </div>

      <div className="info-form-row-style">
        <span>Opis awarii:</span>
        <span>{breakdown.content}</span>
      </div>
    </InfoSectionComponent>
  );
};

const BreakdownRemoveForm = ({ removeBreakdown }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="" style={{ width: "100%" }}>
      <Button
        variant="outline-danger"
        style={{ width: "100%" }}
        onClick={() => setShowModal(true)}
      >
        Usuń
      </Button>
      <ModalDialogComponent
        showModal={showModal}
        header={"Potwierdzenie usnięcia awarii"}
        body={"Czy na pewno chcesz usunąć awariee? Zmiany będą nieodwracalne"}
        acceptFunction={() => {
          removeBreakdown();
          setShowModal(false);
        }}
        declineFunction={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default BreakdownDetailsPage;
