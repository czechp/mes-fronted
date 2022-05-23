import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import {
  deleteRequest,
  getRequest,
  httpErrorHandler,
} from "services/HttpService";
import { BASE_URL } from "services/URL";
import InfoSectionComponent from "components/InfoSection/InfoSectionComponent";
import ModalDialogComponent from "components/ModalDialog/ModalDialogComponent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MaterialDetailsPage = () => {
  const history = useHistory();
  //@ts-ignore
  const { id } = useParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [material, setMaterial] = useState({});

  const requestErrorHandler = (error) => {
    setStatement(httpErrorHandler(error));
  };

  const getMaterialByIdRequest = () => {
    setDataLoaded(false);
    getRequest(`${BASE_URL}/used-raw-materials/${id}`, {
      thenFun: (data) => {
        setMaterial(data);
      },
      catchFun: (error) => {
        requestErrorHandler(error);
      },
      finallyFun: () => {
        setDataLoaded(true);
      },
    });
  };

  const deleteMaterialRequest = () => {
    deleteRequest(`${BASE_URL}/used-raw-materials/${id}`, {
      thenFun: (data) => {
        setStatement({
          content: "Pobrany surowieć usunięty z raportu.",
          isError: false,
        });
        setTimeout(() => {
          history.push("/");
        }, 1500);
      },
      catchFun: (error) => {
        requestErrorHandler(error);
      },
      finallyFun: () => {},
    });
  };

  useEffect(() => {
    getMaterialByIdRequest();
  }, []);

  return (
    <div className="page-style">
      <TitleComponent title={"Szczegóły pobranego surowca"} />
      {dataLoaded && (
        <div className="page-wrapper">
          <InfoSection material={material} />
          <DeleteSection deleteMaterial={deleteMaterialRequest} />
        </div>
      )}
      {!dataLoaded && <LoadSpinnerComponent />}
      <StatementComponent statement={statement} />
    </div>
  );
};

const InfoSection = ({ material }) => {
  return (
    <InfoSectionComponent title={`Szeczegóły pobranowego surowca`}>
      <div className="info-form-row-style">
        <span>Id:</span>
        <span>{material.id}</span>
      </div>
      <div className="info-form-row-style">
        <span>Erp Id:</span>
        <span>{material.systemId}</span>
      </div>
      <div className="info-form-row-style">
        <span>Nazwa:</span>
        <span>{material.name}</span>
      </div>
      <div className="info-form-row-style">
        <span>Dostawca:</span>
        <span>{material.provider}</span>
      </div>
      <div className="info-form-row-style">
        <span>Nr. partii:</span>
        <span>{material.partNr}</span>
      </div>
      <div className="info-form-row-style">
        <span>Data:</span>
        <span>{material.date}</span>
      </div>
    </InfoSectionComponent>
  );
};

const DeleteSection = ({ deleteMaterial }) => {
  const [showModal, setShowModal] = useState(false);
  const deleteMaterialOnClick = () => {
    deleteMaterial();
  };

  return (
    <div style={{ width: "100%" }}>
      <Button
        style={{ width: "100%" }}
        variant="outline-danger"
        onClick={() => setShowModal(true)}
      >
        Usuń
      </Button>
      <ModalDialogComponent
        showModal={showModal}
        header={"Usuwanie pobranego surowca"}
        body={"Czy na penwo chcesz usunąć pobrany surowiec z raportu?"}
        declineFunction={() => setShowModal(false)}
        acceptFunction={deleteMaterialOnClick}
      />
    </div>
  );
};

export default MaterialDetailsPage;
