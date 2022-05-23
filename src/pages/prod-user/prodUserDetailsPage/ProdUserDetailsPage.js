import axios from "axios";
import { Modal } from "react-bootstrap";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import TextInput from "components/TextInput/TextInput";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import "../../../GlobalStyle.css";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";

const ProdUserDetailsPage = () => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);

  //@ts-ignore
  const { id } = useParams();
  const [prodUser, setProdUser] = useState({
    id: 0,
    firstName: "",
    secondName: "",
    userRole: "",
    rfidId: "",
  });

  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });

  const [firstName, setFirstName] = useState({
    value: "",
    valid: true,
  });

  const [secondName, setSecondName] = useState({
    value: "",
    valid: true,
  });

  const [userRole, setUserRole] = useState({
    value: "",
    valid: true,
  });

  const [rfidId, setRfidId] = useState({
    value: "",
    valid: true,
  });

  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);

  const userRoleOnChange = (event) => {
    setUserRole({
      value: event.target.value,
      valid: true,
    });
  };

  const formValidated =
    firstName.valid && secondName.valid && rfidId.valid && userRole.valid;

  const objectToForm = (data) => {
    setFirstName({
      valid: true,
      value: data.firstName,
    });

    setSecondName({
      valid: true,
      value: data.secondName,
    });

    setRfidId({
      valid: true,
      value: data.rfidId,
    });

    setUserRole({
      valid: true,
      value: data.userRole,
    });
  };

  const formToObject = () => {
    const result = {
      id: prodUser.id,
      firstName: firstName.value,
      secondName: secondName.value,
      userRole: userRole.value,
      rfidId: rfidId.value,
    };

    return result;
  };

  const getUser = () => {
    axios
      .get(BASE_URL + "/users/" + id)
      .then((response) => {
        setProdUser(response.data);
        objectToForm(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  const updateProdUser = () => {
    axios
      .put(BASE_URL + "/users/" + prodUser.id, formToObject())
      .then((response) => {
        setStatement({
          content: "Pracownik zaktualizowany",
          isError: false,
        });
        getUser();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  const deleteProdUser = () => {
    axios
      .delete(BASE_URL + `/users/${prodUser.id}`)
      .then((repsone) => {
        setStatement({
          content: "Pracownik usunięty",
          isError: false,
        });
        setDeleteModalVisibility(false);
        setTimeout(() => history.push("/prod-users"), 2000);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-style">
      <TitleComponent title="Szczegóły pracownika" />
      {loaded && (
        <div className="page-wrapper">
          <form action="" className="form-style">
            <TextInput
              value={rfidId.value}
              label="Identyfikator RFID:"
              placeholder="Kliknij tutaj i zbliż kartę do czytnika..."
              minLength={3}
              maxLength={15}
              onAssign={setRfidId}
              defaultText={prodUser.rfidId}
            />

            <TextInput
              value={firstName.value}
              label="Imie:"
              placeholder="Wpisz imie..."
              minLength={3}
              onAssign={setFirstName}
              defaultText={prodUser.firstName}
            />

            <TextInput
            value={secondName.value}
              label="Nazwisko:"
              placeholder="Wpisz nazwisko..."
              minLength={3}
              onAssign={setSecondName}
              defaultText={prodUser.secondName}
            />

            <Form.Label>Dział:</Form.Label>
            <Form.Control
              id="user-role-select"
              as="select"
              onChange={userRoleOnChange}
            >
              <option value="PRODUCTION">Produkcja</option>
              <option value="QUALITY_CONTROL">Kontrola jakości</option>
              <option value="MAINTENANCE">UR</option>
            </Form.Control>
            <Button
              variant="outline-warning"
              style={{ width: "100%", marginTop: "40px" }}
              disabled={!formValidated}
              onClick={updateProdUser}
            >
              Aktualizuj
            </Button>
          </form>
          <div className="form-style">
            <Button
              variant="outline-danger"
              style={{ width: "100%", marginTop: "40px" }}
              disabled={!formValidated}
              onClick={() => {
                setDeleteModalVisibility(true);
              }}
            >
              Usuń
            </Button>
            <Modal
              show={deleteModalVisibility}
              style={{ color: "black" }}
              onHide={() => setDeleteModalVisibility(false)}
            >
              <Modal.Header>
                <h5>Potwierdzenie usunięcia pracownika</h5>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Czy napewno chcesz usunąć użytkownika{" "}
                  <b>{`${prodUser.firstName} ${prodUser.secondName}`}</b>?
                </p>
                <p>Zmiany bedą nieodwracalne.</p>
              </Modal.Body>
              <Modal.Footer
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  style={{ width: "40%" }}
                  variant="outline-success"
                  onClick={deleteProdUser}
                >
                  Tak
                </Button>
                <Button
                  style={{ width: "40%" }}
                  variant="outline-danger"
                  onClick={() => setDeleteModalVisibility(false)}
                >
                  Nie
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}

      {!loaded && <LoadSpinnerComponent />}
      <StatementComponent statement={statement} />
    </div>
  );
};

export default ProdUserDetailsPage;
