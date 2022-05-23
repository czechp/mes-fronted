import axios from "axios";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import ModalDialogComponent from "components/ModalDialog/ModalDialogComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import TextInput from "components/TextInput/TextInput";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import { productionTypeArray } from "utilities/commonUtilities";
import "../../../GlobalStyle.css";
import AdminPanelLineModifyDowntimes from "./AdminPanelLineModifyDowntimes";
import AdminPanelLineModifyMaterial from "./AdminPanelLineModifyMaterials";

const AdminPanelLineModifyPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isLoaded, setLoaded] = useState(false);
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [line, setLine] = useState({
    id: 0,
    name: "",
    workingHours: "",
  });
  const [deleteModal, setDeleteModal] = useState(false);

  const [name, setName] = useState({
    value: "",
    valid: true,
  });

  const [productionType, setProductionType] = useState({
    value: "",
    valid: true,
  });

  const [workingHours, setWorkingHours] = useState({
    value: "",
    valid: true,
  });

  const [downtimes, setDowntimes] = useState([]);
  const [materials, setMaterials] = useState([]);

  const getLine = () => {
    axios
      .get(BASE_URL + `/lines/${id}`)
      .then((response) => {
        setLine(response.data);
        setLoaded(true);
        readDataFromResponse(response);
      })
      .catch((error) => httpErrorHandler(error));
  };

  const readDataFromResponse = (response) => {
    setName({
      value: response.data.name,
      valid: true,
    });
    setProductionType({
      value: response.data.productionType,
      valid: true,
    });
    setWorkingHours({
      value: response.data.workingHours,
      valid: true,
    });
  };

  const deleteLine = () => {
    axios.delete(BASE_URL + "/lines/" + line.id).then((response) => {
      setStatement({
        content: "Linia usunięta. Zostaniesz przekierowany do listy linii",
        isError: false,
      });
      setTimeout(() => {
        history.push("/admin-panel-lines");
      }, 2000);
    });
    setDeleteModal(false);
  };

  const modifyLine = () => {
    if (name.valid) {
      const modifiedLine = {
        name: name.value,
        productionType: productionType.value,
        workingHours: workingHours.value,
      };
      axios
        .put(BASE_URL + "/lines/" + line.id, modifiedLine)
        .then((response) => {
          setStatement({
            content: "Linia zmodyfikowana",
            isError: false,
          });
        })
        .catch((error) => {
          setStatement(httpErrorHandler(error));
        });
    }
  };
  const selectOnChange = (event, assignFunction) => {
    assignFunction({
      value: event.target.value,
      valid: true,
    });
  };

  const getDowntimesRequest = () => {
    axios
      .get(`${BASE_URL}/downtimes/line/${id}`)
      .then((response) => {
        setDowntimes(response.data);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  const deleteDowntimeRequest = (id) => {
    axios
      .delete(`${BASE_URL}/downtimes/${id}`)
      .then((response) => {
        setStatement({
          content: "Przestój produkcyjny usunięty",
          isError: false,
        });
        getDowntimesRequest();
      })
      .catch((error) => {
        setStatement(httpErrorHandler);
      });
  };

  const addDowntimeRequest = (content) => {
    axios
      .post(`${BASE_URL}/downtimes/line/${id}`, { content })
      .then((response) => {
        setStatement({
          content: "Dodano nowy przestój produkcyjny",
          isError: false,
        });
        getDowntimesRequest();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  const getMaterialsRequest = () => {
    axios
      .get(`${BASE_URL}/raw-materials/line/${id}`)
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => setStatement(httpErrorHandler(error)));
  };

  const deleteMaterialRequest = (materialId) => {
    axios
      .delete(`${BASE_URL}/raw-materials/${materialId}`)
      .then((response) => {
        setStatement({
          content: "Surowiec usunięty  z sukcesem",
          isError: false,
        });
        getMaterialsRequest();
      })
      .catch((error) => setStatement(httpErrorHandler(error)));
  };

  const addMaterialRequest = (material) => {
    material.lineId = parseInt(id);
    axios
      .post(`${BASE_URL}/raw-materials`, material)
      .then((response) => {
        setStatement({ content: "Dodano nowy surowiec", isError: false });
        getMaterialsRequest();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  useEffect(() => {
    getLine();
    getDowntimesRequest();
    getMaterialsRequest();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-style">
      {isLoaded && (
        <div className="">
          <TitleComponent title={`Szczegóły linii ${line.name}`} />
          <div className="page-wrapper">
            <div className="form-style">
              {/* MODIFY SECTION  */}

              <TextInput
                value={name.value}
                label="Nazwa: "
                onAssign={setName}
                minLength={4}
                maxLength={4}
              />
              <Form.Group>
                <Form.Label>Typ produktu:</Form.Label>
                <Form.Control
                  as="select"
                  value={productionType.value}
                  onChange={(event) => selectOnChange(event, setProductionType)}
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
                  value={line.workingHours}
                  onChange={(event) => selectOnChange(event, setWorkingHours)}
                >
                  <option value="HOURS8">8 godzin</option>
                  <option value="HOURS12">12 godzin</option>
                </Form.Control>
              </Form.Group>
            </div>

            <div
              className="form-style"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Button
                style={{ marginBottom: "30px" }}
                variant="outline-warning"
                disabled={!name.valid}
                onClick={modifyLine}
              >
                Modyfikuj
              </Button>
              {/* DELETE BUTTON */}
              <Button
                variant="outline-danger"
                onClick={() => {
                  setDeleteModal(true);
                }}
              >
                Usuń
              </Button>{" "}
            </div>

            {/* DELETE MODAL DIALOG  */}
            <ModalDialogComponent
              showModal={deleteModal}
              header="Potwierdzenie usunięcia lini"
              body="Czy na pewno chcesz usunąć linie"
              acceptFunction={deleteLine}
            />
            <AdminPanelLineModifyDowntimes
              downtimes={downtimes}
              addDowntime={addDowntimeRequest}
              deleteDowntime={deleteDowntimeRequest}
            />

            <AdminPanelLineModifyMaterial
              materials={materials}
              deleteMaterial={deleteMaterialRequest} 
              addMaterial={addMaterialRequest}            />
          </div>
        </div>
      )}

      {!isLoaded && <LoadSpinnerComponent />}
      <StatementComponent statement={statement} />
    </div>
  );
};

export default AdminPanelLineModifyPage;
