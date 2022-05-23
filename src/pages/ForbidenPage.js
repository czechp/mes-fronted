import TitleComponent from "../components/Title/TitleComponent";
import "../GlobalStyle.css";

const ForbidenPage = () => {
  return (
    <div className="page-style">
      <TitleComponent title="Zbyt niskie uprawnienia" />
      <div className="page-wrapper">
        <div className="" style={notFoundPageStyle}>
          Nie masz uprawnień do tej zawartości
        </div>
      </div>
    </div>
  );
};

const notFoundPageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
  width: "70%",
  backgroundColor: "#dc3545",
  height: "300px",
  fontSize: "30px",
  borderRadius: "7%",
};

export default ForbidenPage;
