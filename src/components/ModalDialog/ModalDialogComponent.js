import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const ModalDialogComponent = ({ showModal, header, body, acceptFunction = () => { }, declineFunction = () => { } }) => {
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    setVisibility(showModal);
  }, [showModal]);

  return (
    <div className="">
      <Modal
        show={visibility}
        style={{ color: "black"}}
        onHide={() => setVisibility(true)}
      >
        <Modal.Header>
          <h5>{header}</h5>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={() => {
              acceptFunction();
              setVisibility(false);
            }}
            variant="outline-success"
            style={buttonStyle}
          >
            Tak
          </Button>
          <Button
            variant="outline-danger"
            style={buttonStyle}
            onClick={() => {
              setVisibility(false);
              declineFunction();
            }}
          >
            Nie
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const buttonStyle = {
  width: "40%",
};
export default ModalDialogComponent;
