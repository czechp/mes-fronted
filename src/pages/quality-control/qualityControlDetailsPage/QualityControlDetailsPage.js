import axios from "axios";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import "../../../GlobalStyle.css";
import colors from "configuration/colors";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import { translateProdUserRole } from "utilities/commonUtilities";
import dateFormatter from "utilities/dateFormatter";
import InfoSectionComponent from "components/InfoSection/InfoSectionComponent";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import Separator from "components/Separator/Separator";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import ModalDialogComponent from "components/ModalDialog/ModalDialogComponent";
import { useHistory } from "react-router-dom";

const QualityControlDetailsPage = () => {
  //@ts-ignore
  const { qualityControlId } = useParams();
  const history = useHistory();
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [loaded, setLoaded] = useState(false);

  const [qualityControl, setQualityControl] = useState();

  const getQualityControlRequest = () => {
    setQualityControl(null);
    setLoaded(false);

    axios
      .get(`${BASE_URL}/quality-controls/${qualityControlId}`)
      .then((response) => {
        setQualityControl(response.data);
      })
      .catch((error) => setStatement(httpErrorHandler(error)))
      .finally(() => setLoaded(true));
  };

  const deleteQualityControlRequest = () => {
    axios
      .delete(`${BASE_URL}/quality-controls/${qualityControlId}`)
      .then((response) => {
        setStatement({
          content: "Kontrola jakości została usunięta.",
          isError: false,
        });
        setTimeout(() => {
          history.push("/");
        }, 1500);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  useEffect(() => {
    getQualityControlRequest();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-style">
      <TitleComponent title="Kontrola jakości - szczegóły" />
      {loaded && (
        <div className="page-wrapper">
          {qualityControl ? (
            <QualityControlExists
              qualityControl={qualityControl}
              deleteQualityControl={deleteQualityControlRequest}
            />
          ) : (
            <QualityContolsNotExists />
          )}
        </div>
      )}
      {!loaded && <LoadSpinnerComponent />}

      <StatementComponent statement={statement} />
    </div>
  );
};

const QualityControlExists = ({ qualityControl, deleteQualityControl }) => {
  const inspectionOK = !qualityControl.inspections.some((insepction) => !insepction.qualityOK);

  return (
    <div className="" style={{ width: "100%" }}>
      <h2>Wynik kontroli:</h2>
      <h2 style={{ color: inspectionOK ? colors.success : colors.danger }}>
        {inspectionOK ? "OK" : "NOK"}
      </h2>
      <InfoSectionComponent>
        <div className="info-form-row-style">
          <span>Id:</span>
          <span>{qualityControl.id}</span>
        </div>

        <div className="info-form-row-style">
          <span>Wykonał:</span>
          <span>{qualityControl.inspector}</span>
        </div>

        <div className="info-form-row-style">
          <span>Dział:</span>
          <span>{translateProdUserRole(qualityControl.inspectorRole)}</span>
        </div>

        <div className="info-form-row-style">
          <span>Data utworzenia:</span>
          <span>{dateFormatter(qualityControl.creationDate)}</span>
        </div>
        {qualityControl.inspections.flatMap((inspection) => (
          <InspectioRow inspection={inspection} />
        ))}
      </InfoSectionComponent>
      <RemoveQualityControl
        deleteQualityControlOnPress={deleteQualityControl}
      />
    </div>
  );
};

const InspectioRow = ({ inspection }) => {
  return (
    <div
      className=""
      style={{
        width: "100%",
        fontSize: "20px",
        color: inspection.qualityOK ? colors.success : colors.danger,
      }}
    >
      <Separator />
      <p>{inspection.content}</p>
      <p>{inspection.qualityOK ? "OK" : "NOK"}</p>
    </div>
  );
};

const RemoveQualityControl = ({ deleteQualityControlOnPress }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      <Button
        variant="outline-danger"
        style={{ width: "100%" }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Usuń
      </Button>
      <ModalDialogComponent
        showModal={showModal}
        header="Usuwanie kontroli jakości"
        body="Czy na pewno chcesz usunąć kontrole jakości?"
        acceptFunction={() => {
          deleteQualityControlOnPress();
          setShowModal(false);
        }}
        declineFunction={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

const QualityContolsNotExists = () => {
  return (
    <InfoSectionComponent>
      <h3 style={{ color: colors.danger }}>Kontrola jakości nie istnieje</h3>
    </InfoSectionComponent>
  );
};

export default QualityControlDetailsPage;
