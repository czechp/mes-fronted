import axios from "axios";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import TextInput from "components/TextInput/TextInput";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import { productionTypeArray } from "utilities/commonUtilities";
import "../../../GlobalStyle.css";

const AdminPanelLineAdd = () => {
  const history = useHistory();
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });

  const [name, setName] = useState({
    value: "",
    valid: false,
  });

  const [productionType, setProductionType] = useState({
    value: "PTS",
    valid: true,
  });

  const [workingHours, setWorkingHours] = useState({
    value: "HOURS8",
    valid: true,
  });

  const selectOnChange = (event, asssignFunction) => {
    asssignFunction({
      value: event.target.value,
      validated: true,
    });
  };

  const addLineOnClick = () => {
    if (name.valid) {
      const newLine = {
        name: name.value,
        workingHours: workingHours.value,
        productionType: productionType.value,
      };
      axios
        .post(BASE_URL + "/lines", newLine)
        .then((response) => {
          setStatement({
            content: "Utworzono nową linie. Powrót do listy.",
            isError: false,
          });
          setTimeout(() => {
            history.push("/admin-panel-lines");
          }, 2000);
        })
        .catch((error) => setStatement(httpErrorHandler(error)));
    }
  };

  return (
    <div className="page-style">
      <TitleComponent title="Dodaj nową linie" />
      <div className="page-wrapper">
        <div className="form-style">
          <TextInput
            label="Nazwa linii:"
            placeholder="Wpisz nazwę linii"
            onAssign={setName}
            minLength={4}
            maxLength={4}
            value={name.value}
          />
          <Form.Group>
            <Form.Label>Wybierz rodzaj produkcji:</Form.Label>
            <Form.Control
              as="select"
              value={productionType.value}
              onChange={(event) => {
                selectOnChange(event, setProductionType);
              }}
            >
              {productionTypeArray.map((type) => (
                <option value={type.value}>{type.display}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Długość zmiany:</Form.Label>
            <Form.Control
              as="select"
              value={workingHours.value}
              onChange={(event) => selectOnChange(event, setWorkingHours)}
            >
              <option value="HOURS8">8 godzin</option>
              <option value="HOURS12">12 godzin</option>
            </Form.Control>
            <Button
              variant="outline-success"
              style={{ width: "100%", marginTop: "50px" }}
              disabled={!name.valid}
              onClick={addLineOnClick}
            >
              Dodaj
            </Button>
          </Form.Group>
        </div>
      </div>
      <StatementComponent statement={statement} />
    </div>
  );
};

export default AdminPanelLineAdd;
