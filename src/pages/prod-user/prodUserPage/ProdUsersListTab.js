import { Table } from "react-bootstrap";
import "./ProdUsersStyle.css";
import "../../../GlobalStyle.css";
import {
  sortArrayByNumber,
  sortArrayByString,
  translateProdUserRole,
} from "../../../utilities/commonUtilities";
import { useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
const ProdUsersListTab = ({ prodUsers, onAssignProdUsers }) => {
  const [sortMultiplier, setSortMultiplier] = useState(1);
  const history = useHistory();
  const toggleSortMultiplier = () => {
    setSortMultiplier(sortMultiplier * -1);
  };

  const sortById = () => {
    sortArrayByNumber(
      prodUsers,
      "id",
      sortMultiplier,
      onAssignProdUsers,
      toggleSortMultiplier
    );
  };
  const sortByFirstName = () => {
    sortArrayByString(
      prodUsers,
      "firstName",
      sortMultiplier,
      onAssignProdUsers,
      toggleSortMultiplier
    );
  };

  const sortBySecondName = () => {
    sortArrayByString(
      prodUsers,
      "secondName",
      sortMultiplier,
      onAssignProdUsers,
      toggleSortMultiplier
    );
  };

  const sortByRfidNumber = () => {
    sortArrayByString(
      prodUsers,
      "rfidId",
      sortMultiplier,
      onAssignProdUsers,
      toggleSortMultiplier
    );
  };

  const sortByRole = () => {
    sortArrayByString(
      prodUsers,
      "userRole",
      sortMultiplier,
      onAssignProdUsers,
      toggleSortMultiplier
    );
  };

  return (
    <div className="">
      <Table variant="dark" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th onClick={sortById}>Id:</th>
            <th onClick={sortByFirstName}>Imie: </th>
            <th onClick={sortBySecondName}>Nazwisko: </th>
            <th onClick={sortByRfidNumber}>Numer RFID:</th>
            <th onClick={sortByRole}>Dział:</th>
          </tr>
        </thead>
        <tbody>
          {prodUsers.map((prodUser, idx) => (
            <tr key={`row-${prodUser.id}`} onClick={()=>history.push(`/prod-user-details/${prodUser.id}`)}>
              <td key={`${idx}-id-${prodUser.id}`}>{prodUser.id}</td>
              <td key={`${idx}-firstName-${prodUser.id}`}>
                {prodUser.firstName}
              </td>
              <td key={`${idx}-secondName-${prodUser.id}`}>
                {prodUser.secondName}
              </td>
              <td key={`${idx}-rfidId-${prodUser.id}`}>{prodUser.rfidId}</td>
              <td key={`${idx}-row-${prodUser.id}`}>
                {translateProdUserRole(prodUser.userRole)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProdUsersListTab;
