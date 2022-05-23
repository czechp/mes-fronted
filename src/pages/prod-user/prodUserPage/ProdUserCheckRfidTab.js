import axios from "axios";
import TextInput from "components/TextInput/TextInput";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BASE_URL } from "services/URL";
import { translateProdUserRole } from "utilities/commonUtilities";
import "../../../GlobalStyle.css";

const ProdUserCheckRFID = () => {
  const [rfidNumber, setRfidNumber] = useState({
    value: "",
    valid: false,
  });

  const [foundedUser, setFoundedUser] = useState({
    id: 0,
    firstName: "",
    secondName: "",
    userRole: "",
    rfidId: "",
  });

  const [foundedUserVisibility, setFoundedUserVisibility] = useState(false);
  const [userNotExistsVisiblity, setUserNotExistsVisibility] = useState(false);

  const rfidNumberOnAssign = (data) => {
    setRfidNumber(data);
  };

  const checkRfid = () => {
    axios
      .get(BASE_URL + "/users/rfid/" + rfidNumber.value)
      .then((response) => {
        setFoundedUser(response.data);
        setFoundedUserVisibility(true);
        setUserNotExistsVisibility(false);
      })
      .catch((error) => {
        setFoundedUserVisibility(false);
        setUserNotExistsVisibility(true);
      });
  };

  return (
    <div className="page-wrapper" style={{ marginTop: "20px" }}>
      <form action="" className="form-style">
        <TextInput
          value={rfidNumber.value}
          onAssign={rfidNumberOnAssign}
          label="Podaj identyfikator RFID:"
          placeholder="Kliknij tutaj i zbliż kartę do czytnika"
          minLength={3}
          maxLength={15}
        />

        <Button
          onClick={checkRfid}
          variant="outline-primary"
          style={{ width: "100%", marginBottom: "40px" }}
        >
          Sprawdź
        </Button>
      </form>

      {foundedUserVisibility && (
        <div className="info-form-style">
          <div className="info-form-row-style">
            <span>Id:</span>
            <span>{foundedUser.id}</span>
          </div>

          <div className="info-form-row-style">
            <span>Imie:</span>
            <span>{foundedUser.firstName}</span>
          </div>

          <div className="info-form-row-style">
            <span>Nazwisko:</span>
            <span>{foundedUser.secondName}</span>
          </div>

          <div className="info-form-row-style">
            <span>Dział:</span>
            <span>{translateProdUserRole(foundedUser.userRole)}</span>
          </div>

          <div className="info-form-row-style">
            <span>Identyfikator Rfid:</span>
            <span>{foundedUser.rfidId}</span>
          </div>
        </div>
      )}

      {userNotExistsVisiblity && (
        <div className="info-form-style">
          <h4 style={{ color: "red" }}>
            Ta karta nie została jeszcze przypisana do żadnego pracownika
          </h4>
        </div>
      )}
    </div>
  );
};

export default ProdUserCheckRFID;
