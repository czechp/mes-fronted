import React from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";

import TextInput from "components/TextInput/TextInput";
import DeleteIconComponent from "components/DeleteIcon/DeleteIconComponent";

const AdminPanelLineModifyDowntimes = ({
  downtimes,
  deleteDowntime,
  addDowntime,
}) => {
  return (
    <div
      className=""
      // @ts-ignore
      style={styles.container}
    >
      <h4 style={{ marginBottom: "50px" }}>Przestoje produkcyjne:</h4>
      <AdminPanelLineDowntimesAdd addDowntime={addDowntime} />
      <AdminPanelLineDowntimesList
        downtimes={downtimes}
        deleteDowntime={deleteDowntime}
      />
    </div>
  );
};

const AdminPanelLineDowntimesList = ({ downtimes, deleteDowntime }) => {
  return (
    <div className="" style={{ width: "100%" }}>
      <Table variant="dark">
        <thead>
          <tr>
            <th>Id:</th>
            <th>Opis:</th>
            <th>Usuń:</th>
          </tr>
        </thead>
        <tbody>
          {downtimes.map((item, id) => (
            <tr key={`${item.id}-${id}`}>
              <td>{item.id}</td>
              <td>{item.content}</td>
              <td>
                <DeleteIconComponent
                  onDelete={() => deleteDowntime(item.id)}
                  header={"Usuwanie postoju produkcyjnego"}
                  body={"Czy na pewno chcesz usunąć postój produkcyjny?"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const AdminPanelLineDowntimesAdd = ({ addDowntime }) => {
  const [newDowntime, setNewDowntime] = useState({
    value: "",
    valid: undefined,
  });


  const addDowntimeOnClick = () => {
    if (newDowntime.valid) addDowntime(newDowntime.value);
  };
  return (
    <div>
      <TextInput
        label={"Dodaj:"}
        onAssign={setNewDowntime}
        value={newDowntime.value}
        placeholder="Dodaj nowy przestój produkcyjnych"
        minLength={5}
        maxLength={30}
      />
      <Button
        variant="outline-success"
        style={{ width: "40%", marginBottom: "50px" }}
        onClick={() => addDowntimeOnClick()}
      >
        Dodaj
      </Button>
    </div>
  );
};

const styles = {
  container: {
    width: "70%",
    display: "flex",
    justifyContent: "center",
    marginTop: "100px",
    flexDirection: "column",
  },
};

export default AdminPanelLineModifyDowntimes;
