// @ts-nocheck
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

import TitleComponent from "components/Title/TitleComponent";
import "../../../GlobalStyle.css";
import { useState } from "react";
import StatementComponent from "components/Statement/StatementCompnent";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import { BASE_URL } from "services/URL";
import { useEffect } from "react";
import { httpErrorHandler } from "services/HttpService";
import InfoSectionComponent from "components/InfoSection/InfoSectionComponent";
import { getDowntimeState } from "utilities/commonUtilities";
import dateFormatter from "utilities/dateFormatter";
import ModalDialogComponent from "components/ModalDialog/ModalDialogComponent";
import { useHistory } from "react-router-dom";

const DowntimeDetailsPage = () => {
  //@ts-ignore
  const { id } = useParams();
  const [downtime, setDowntime] = useState();
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const history = useHistory();

  const getDowntimeRequest = () => {
    axios
      .get(`${BASE_URL}/downtimes-executed/${id}`)
      .then((response) => {
        setDowntime(response.data);
        setDataLoaded(true);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  const removeDowntimeRequest = () => {
    axios
      .delete(`${BASE_URL}/downtimes-executed/${id}`)
      .then((response) => {
        setStatement({ content: "Przestój produkcyjny ustnięty. Przekierowanie do listy linii", isError: false });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((error) => setStatement(httpErrorHandler(error)));
  };

  useEffect(() => {
    getDowntimeRequest();
  }, []);

  return (
    <div className="page-style">
      <TitleComponent title="Szczęgóły przestoju produkcyjnego" />
      {dataLoaded && (
        <div className="page-wrapper">
          <InfoSectionComponent>
            <InfoRow title="Id:" data={downtime.id} />
            <InfoRow title="Opis:" data={downtime.content} />
            <InfoRow title="Operator:" data={downtime.operatorName} />
            <InfoRow
              title="Status:"
              data={getDowntimeState(downtime.downtimeExecutedState)}
            />
            <InfoRow
              title="Data rozpoczęcia:"
              data={dateFormatter(downtime.creationDate)}
            />
            <InfoRow
              title="Data zakończenia:"
              data={
                downtime.downtimeExecutedState === "CLOSE"
                  ? dateFormatter(downtime.closeDate)
                  : "Aktywny"
              }
            />
            <InfoRow title="Czas trwania:" data={downtime.totalMinutes} />
          </InfoSectionComponent>
          <Button
            variant="outline-danger"
            style={{ width: "100%" }}
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            Usuń
          </Button>
          <ModalDialogComponent
            showModal={showDeleteModal}
            header="Usuwanie przestoju produkcyjnego"
            body="Czy na pewno chcesz usunąć postój produkcyjny?"
            acceptFunction={() => {
              setShowDeleteModal(false);
              removeDowntimeRequest();
            }}
            declineFunction={() => {
              setShowDeleteModal(false);
            }}
          />
        </div>
      )}
      {!dataLoaded && <LoadSpinnerComponent />}
      <StatementComponent statement={statement} />
    </div>
  );
};

const InfoRow = ({ title, data }) => {
  return (
    <p className="info-form-row-style">
      <span>{title}</span>
      <span>{data}</span>
    </p>
  );
};

export default DowntimeDetailsPage;
