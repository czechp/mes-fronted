import StatementComponent from "../../../components/Statement/StatementCompnent";
import TitleComponent from "../../../components/Title/TitleComponent";
import "../../../GlobalStyle.css";
import "./ProdUsersStyle.css";
import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../../services/URL";
import { httpErrorHandler } from "../../../services/HttpService";
import { useEffect } from "react";
import ProdUsersListTab from "./ProdUsersListTab";
import ProdUsersAddTab from "./ProdUsersAddTab";
import ProdUserCheckRfidTab from "./ProdUserCheckRfidTab";
import React from "react";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";

const ProdUserPage = () => {
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });

  const [loaded, setLoaded] = useState(false);
  const [prodUsers, setProdUsers] = useState([]);

  const getProdUsers = () => {
    axios
      .get(BASE_URL + "/users")
      .then((response) => {
        setProdUsers(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  const prodUsersOnAssign = (newProdUsers) => {
    setProdUsers(newProdUsers);
  };

  const addProdUser = (user) => {
    axios
      .post(BASE_URL + "/users", user)
      .then((response) => {
        setStatement({
          content: "Użytkownik dodany",
          isError: false,
        });

        getProdUsers();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  useEffect(() => {
    getProdUsers();
  }, []);

  return (
    <div className="page-style">
      <TitleComponent title="Pracownicy" />
      {loaded && (<div className="page-wrapper">
        <Tabs fill justify defaultActiveKey="list" style={{ width: "80%" }}>
          <Tab eventKey="list" title="Lista">
            <ProdUsersListTab
              prodUsers={prodUsers}
              onAssignProdUsers={prodUsersOnAssign}
              style={{ width: "100%" }}
            />
          </Tab>
          <Tab eventKey="add" title="Dodaj">
            <ProdUsersAddTab onAddProdUser={addProdUser} />
          </Tab>
          <Tab eventKey="check-rfid" title="Sprawdź karte">
            <ProdUserCheckRfidTab />
          </Tab>
        </Tabs>
      </div>)}

      {!loaded && (<LoadSpinnerComponent />)}
      <StatementComponent statement={statement} />
    </div>
  );
};

export default ProdUserPage;
