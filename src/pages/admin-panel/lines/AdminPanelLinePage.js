import axios from "axios";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import { translateProductType } from "utilities/commonUtilities";
import "../../../GlobalStyle.css";


const AdminPanelLinePage = () => {
    const history = useHistory();
    const [statement, setStatement] = useState(
        {
            content: "",
            isError: undefined
        }
    );
    const [lines, setLines] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const getLines = () => {
        axios.get(BASE_URL + "/lines")
            .then(response => {
                setLines(response.data);
                setLoaded(true);
            })
            .catch(error => {
                setStatement(httpErrorHandler);
            })
    }
    useEffect(() => {
        getLines();
    }, []);
    return (
        <div className="page-style">
            <TitleComponent title="Zarządzaj liniami" />
            {isLoaded && (
                <div className="page-wrapper">
                    <Button variant="outline-success" style={{ width: "40%", marginBottom: "50px" }} onClick={()=>history.push("/admin-panel-add-line")}>Dodaj nową linie</Button>
                    <Table variant="dark">
                        <thead>
                            <tr>
                                <th>Id:</th>
                                <th>Nazwa:</th>
                                <th>Dział:</th>
                                <th>Szczegóły:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lines.map((line, idx) => (<tr
                                key={`row-${line.id}-${idx}`}>
                                <td key={`id-${line.id}-${idx}`}>{line.id}</td>
                                <td key={`name-${line.name}-${idx}`}>{line.name}</td>
                                <td key={`production-type-${line.productionType}-${idx}`}>{translateProductType(line.productionType)}</td>
                                <td key={`modify-${line.id}-${idx}`}>
                                    <Button onClick={() => { history.push("admin-panel-modify-lines/" + line.id) }} style={{ width: "150px" }} variant="outline-primary">Szczegóły</Button>
                                </td>

                            </tr>))}
                        </tbody>
                    </Table>

                </div>


            )}

            {!isLoaded && (<LoadSpinnerComponent />)}
            <StatementComponent statement={statement} />
        </div>
    );
}

export default AdminPanelLinePage;