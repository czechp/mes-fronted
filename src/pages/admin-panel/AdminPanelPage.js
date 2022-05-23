import TitleComponent from "components/Title/TitleComponent";
import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../GlobalStyle.css";


const AdminPanelPage = () => {
    const history = useHistory();

    return (
        <div className="page-style">
            <TitleComponent title="Zarządzaj systemem" />
            <div className="page-wrapper">
                <Button onClick={()=>history.push("/users")} variant="outline-light" style={navigateButtonStyle} >Konta użytkowników</Button>
                <Button onClick={()=>history.push("/admin-panel-lines")} variant="outline-light" style={navigateButtonStyle} >Linie</Button>
            </div>
        </div>
    );
}

const navigateButtonStyle = {
    width: "40%",
    height: "60px",
    marginBottom: "30px"
}


export default AdminPanelPage;