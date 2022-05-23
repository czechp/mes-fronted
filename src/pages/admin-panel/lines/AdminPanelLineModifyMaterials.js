import DeleteIconComponent from "components/DeleteIcon/DeleteIconComponent";
import TextInput from "components/TextInput/TextInput";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";

import "./AdminPanelLineModifyMaterials.css";

const AdminPanelLineModifyMaterial = ({
  materials,
  deleteMaterial,
  addMaterial,
}) => {
  return (
    <div className="admin-panel-line-modify-materials-container">
      <h4 className="admin-panel-line-modify-materials-title">Surowce:</h4>

      <AddMaterial addMaterial={addMaterial} />
      <MaterialList materials={materials} deleteMaterial={deleteMaterial} />
    </div>
  );
};

const MaterialList = ({ materials, deleteMaterial }) => {
  const deleteMaterialOnClick = (id) => {
    deleteMaterial(id);
  };
  return (
    <div className="">
      <Table variant="dark" className="admin-panel-line-modify-materials-table">
        <thead>
          <tr>
            <th>Id:</th>
            <th>Erp Id:</th>
            <th>Nazwa:</th>
            <th>Dostawca:</th>
            <th>Usuń:</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((item, id) => (
            <tr key={`${item.id}-${id}`}>
              <td>{item.id}</td>
              <td>{item.systemId}</td>
              <td>{item.name}</td>
              <td>{item.provider}</td>
              <td>
                <DeleteIconComponent
                  onDelete={() => deleteMaterialOnClick(item.id)}
                  header="Potwierdzenie usunięcia materiału"
                  body={`Czy na pewno chcesz usunąc surowiec ${item.name}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const AddMaterial = ({ addMaterial }) => {
  const [systemId, setSystemId] = useState({
    value: "",
    valid: false,
  });

  const [name, setName] = useState({
    value: "",
    valid: false,
  });

  const [provider, setProvider] = useState({
    value: "",
    valid: false,
  });

  const addOnClick = () => {
    const material = {
      systemId: systemId.value,
      name: name.value,
      provider: provider.value,
    };

    addMaterial(material);

    setSystemId({value: "", valid: false})
    setName({ value: "", valid: false });
    setProvider({ value: "", valid: false });
  };

  const buttonEnabled = name.valid && provider.valid && systemId.valid;

  return (
    <div className="admin-panel-line-modify-materials-form">
      <h5 className="admin-panel-line-modify-materials-title">Dodaj:</h5>
      <TextInput
        label={"ERP Id:"}
        onAssign={setSystemId}
        value={systemId.value}
        minLength={3}
      />
      <TextInput
        label={"Nazwa:"}
        onAssign={setName}
        value={name.value}
        minLength={3}
      />
      <TextInput
        label={"Dostawca:"}
        onAssign={setProvider}
        value={provider.value}
        minLength={3}
      />
      <Button
        variant="outline-success"
        className="admin-panel-line-modify-materials-form-button"
        disabled={!buttonEnabled}
        onClick={addOnClick}
      >
        Dodaj
      </Button>
    </div>
  );
};

export default AdminPanelLineModifyMaterial;
