import "../../../GlobalStyle.css";
import TextInput from "../../../components/TextInput/TextInput";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import React from "react";
const ProdUsersAddTab = ({ onAddProdUser }) => {
  const [firstName, setFirstName] = useState({
    value: "",
    valid: false,
  });
  const [secondName, setSecondName] = useState({
    value: "",
    valid: false,
  });
  const [rfidId, setRfidId] = useState({
    value: "",
    valid: false,
  });
  const [userRole, setUserRole] = useState({
    value: "PRODUCTION",
    valid: true,
  });

  const userRoleOnChange = (event) => {
    console.log(event.target.value);
    setUserRole({
      value: event.target.value,
      valid: true,
    });
  };

  const dataValidated =
    firstName.valid && secondName.valid && rfidId.valid && userRole.valid;

  const addProdUser = () => {
    if (dataValidated) {
      const user = {
        firstName: firstName.value,
        secondName: secondName.value,
        rfidId: rfidId.value,
        userRole: userRole.value,
      };
      onAddProdUser(user);
    }
  };

  return (
    <div className="page-wrapper" style={{ marginTop: "20px" }}>
      <form action="" className="form-style">
        <Form>
          <TextInput
            value={rfidId.value}
            label="Identyfikator RFID:"
            placeholder="Kliknij tutaj i zbliż kartę do czytnika..."
            minLength={3}
            maxLength={15}
            onAssign={setRfidId}
          />

          <TextInput
            value={firstName.value}
            label="Imie:"
            placeholder="Wpisz imie..."
            minLength={3}
            onAssign={setFirstName}
          />

          <TextInput
            value={secondName.value}
            label="Nazwisko:"
            placeholder="Wpisz nazwisko..."
            minLength={3}
            onAssign={setSecondName}
          />

          <Form.Group>
            <Form.Label>Dział:</Form.Label>
            <Form.Control
              as="select"
              value={userRole.value}
              onChange={userRoleOnChange}
            >
              <option value="PRODUCTION">Produkcja</option>
              <option value="QUALITY_CONTROL">Kontrola jakości</option>
              <option value="MAINTENANCE">UR</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button
          variant="outline-success"
          disabled={!dataValidated}
          style={{ width: "100%", marginTop: "40px" }}
          onClick={addProdUser}
        >
          Dodaj
        </Button>
      </form>
    </div>
  );
};

export default ProdUsersAddTab;
