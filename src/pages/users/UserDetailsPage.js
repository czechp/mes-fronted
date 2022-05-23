import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TitleComponent from "../../components/Title/TitleComponent";
import "../../GlobalStyle.css";
import StatementComponent from "../../components/Statement/StatementCompnent";
import axios from "axios";
import { BASE_URL } from "../../services/URL";
import { httpErrorHandler } from "../../services/HttpService";
import { useEffect } from "react";
import { translateAppUserRole } from "../../utilities/commonUtilities";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import React from "react";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });

  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    enabled: false,
    appUserRole: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getUser = () => {
    axios
      .get(BASE_URL + "/appusers/" + userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
        setTimeout(() => {
          history.push("/users");
        }, 3000);
      });
  };

  const activateUser = (enable) => {
    axios
      .patch(
        BASE_URL + `/appusers/enable/${userId}`,
        {},
        { params: { enable } }
      )
      .then((response) => {
        setStatement({
          content: `Użytkownik ${enable ? "aktywny" : "nieaktywny"}`,
          isError: false,
        });
        getUser();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  const changeRole = (event) => {
    const newRole = event.target.value;
    axios
      .patch(
        BASE_URL + `/appusers/role/${user.id}`,
        {},
        { params: { role: newRole } }
      )
      .then((response) => {
        const role = translateAppUserRole(newRole);
        setStatement({
          content: `Zmiana typu konta na ${role}`,
          isError: false,
        });
        getUser();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  const deleteUser = () => {
    axios
      .delete(BASE_URL + `/appusers/${user.id}`)
      .then((response) => {
        setStatement({
          content: "Użytkownik usunięty",
          isError: false,
        });
        setShowDeleteModal(false);
        setTimeout(() => history.push("/users"), 3000);
      })
      .catch((error) => {
        setShowDeleteModal(false);
        setStatement(httpErrorHandler(error));
      });
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-style">
      <TitleComponent title={`Szczegóły użykownika ${user.username}`} />
      <div className="page-wrapper">
        <div className="section-style">
          <div className="info-form-style">
            <div className="info-form-row-style">
              <span>Id: </span>
              <span>{user.id}</span>
            </div>
            <div className="info-form-row-style">
              <span>Login: </span>
              <span>{user.username}</span>
            </div>
            <div className="info-form-row-style">
              <span>Email: </span>
              <span>{user.email}</span>
            </div>
            <div className="info-form-row-style">
              <span>Rodzaj konta: </span>
              <span>{translateAppUserRole(user.appUserRole)}</span>
            </div>
            <div className="info-form-row-style">
              <span>Aktywowany: </span>
              <span>{user.enabled ? "tak" : "nie"}</span>
            </div>
          </div>

        </div>
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
            width: "40%",
          }}
        >
          <Button
            variant="outline-success"
            onClick={() => activateUser(true)}
            style={{ width: "40%" }}
          >
            Aktywuj
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => activateUser(false)}
            style={{ width: "40%" }}
          >
            Dezaktywuj
          </Button>
        </div>
        <div className="" style={{ marginTop: "50px", width: "40%" }}>
          <Form.Group>
            <Form.Label>Zmień typ konta: </Form.Label>
            <FormControl
              as="select"
              value={user.appUserRole}
              onChange={(event) => changeRole(event)}
            >
              <option value="USER">Użytkownik</option>
              <option value="MANAGEMENT">Management</option>
              <option value="SUPERUSER">Superuser</option>
              <option value="ADMIN">Admin</option>
            </FormControl>
          </Form.Group>
        </div>
        <div className="" style={{ width: "40%", marginTop: "50px" }}>
          <Button
            variant="outline-danger"
            style={{ width: "100%" }}
            onClick={() => setShowDeleteModal(true)}
          >
            Usuń
          </Button>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            style={{ color: "black" }}
          >
            <Modal.Header>
              <h5>Potwierdzenie usunięcia użytkownika</h5>
            </Modal.Header>
            <Modal.Body>
              <p>Czy napewno chcesz usunąć użytkownika {user.username}?</p>
              <p>Zmiany bedą nieodwracalne</p>
            </Modal.Body>
            <Modal.Footer
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="outline-success"
                style={{ width: "40%" }}
                onClick={deleteUser}
              >
                Tak
              </Button>
              <Button
                variant="outline-danger"
                style={{ width: "40%" }}
                onClick={() => setShowDeleteModal(false)}
              >
                Nie
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <StatementComponent statement={statement} />
    </div>
  );
};

export default UserDetailsPage;
