import React from "react";
import TitleComponent from "../components/Title/TitleComponent";
import "../GlobalStyle.css";


const NotFoundPage = ()=>{
    return (
        <div className="page-style">
        <TitleComponent title="Strona nie istnieje" />
        <div className="page-wrapper">
          <div className="" style={notFoundPageStyle}>
                Nie ma takiej strony lub link nie jest poprawny
          </div>
        </div>
      </div>
    );
}

const notFoundPageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
    width: "70%",
    backgroundColor: "#dc3545",
    height: "300px",
    fontSize: "30px",
    borderRadius: "7%"
}

export default NotFoundPage;