import ModalDialogComponent from "components/ModalDialog/ModalDialogComponent";
import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

import "../../../GlobalStyle.css";

const ReportDetailsRemoveForm = ({ reportId, deleteReport }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="center-container">
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
        header="Potwierdzenie usunięcia raportu"
        body="Czy na pewno chcesz usunąć raport? Zmiany będą nieodwracalne"
        acceptFunction={deleteReport}
        declineFunction={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default ReportDetailsRemoveForm;
