import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const MaterialList = ({ materials }) => {
  const history = useHistory();
  return (
    <div className="" style={{ marginTop: "100px" }}>
      <h3 style={{ marginBottom: "30px" }}>Pobrane surowce:</h3>
      <Table variant="dark">
        <tr>
          <th>Id:</th>
          <th>Erp id:</th>
          <th>Nazwa:</th>
          <th>Dostawca:</th>
          <th>Nr. partii:</th>
          <th>Data:</th>
        </tr>
        <tbody>
          {materials.map((item, index) => (
            <tr key={`${item}-${index}`} onClick={()=>{history.push(`/material/${item.id}`)}}>
              <td>{item.id}</td>
              <td>{item.systemId}</td>
              <td>{item.name}</td>
              <td>{item.provider}</td>
              <td>{item.partNr}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MaterialList;
