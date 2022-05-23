import "../../GlobalStyle.css";
import TitleComponent from "../../components/Title/TitleComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/URL";
import StatementComponent from "../../components/Statement/StatementCompnent";
import { httpErrorHandler } from "../../services/HttpService";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../GlobalStyle.css";
import { translateAppUserRole } from "../../utilities/commonUtilities";
import React from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const history = useHistory();

  const getUsers = () => {
    axios
      .get(BASE_URL + "/appusers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  useEffect(() => {
    getUsers();
  }, [statement.content]);

  return (
    <div className="page-style">
      <TitleComponent title="Użytkownicy" />
      <div className="page-wrappper">
        <Table variant="dark"  >
          <thead>
            <tr>
            <th>Id:</th>
            <th>Login:</th>
            <th>Email:</th>
            <th>Rola: </th>
            <th>Aktywowany:</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} onClick={()=>history.push(`/user-details/${user.id}`)}>
                <td key={`$(idx)-$(user.id)`}>{user.id}</td>
                <td key={`$(idx)-$(user.username)`}>{user.username}</td>
                <td key={`$(idx)-$(user.email)`}>{user.email}</td>
                <td key={`$(idx)-$(user.appUserRole)`}>{translateAppUserRole(user.appUserRole)}</td>
                <td key={`$(idx)-$(user.enabled)`} style={{color: user.enabled ? "green" : "red"}}>{user.enabled ? "tak" : "nie"}</td>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>
      <StatementComponent statement={statement} />
    </div>
  );
};

export default UsersPage;
