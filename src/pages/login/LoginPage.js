import { useState } from "react";
import { Button } from "react-bootstrap";
import TitleComponent from "../../components/Title/TitleComponent";
import TextInput from "../../components/TextInput/TextInput";
import axios from "axios";
import "../../GlobalStyle.css";
import { BASE_URL } from "../../services/URL";
import { useHistory } from "react-router";
import { login } from "../../services/AuthorizationService";
import StatementComponent from "../../components/Statement/StatementCompnent";
import { httpErrorHandler } from "../../services/HttpService";
import React from "react";

const LoginPage = () => {
  const [username, setUsername] = useState({
    value:"",
    valid: false
  });
  const [password, setPassword] = useState({
    value:"",
    valid: false
  });
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const history = useHistory();


  const loginButtonOnClick = () => {
    axios
      .post(BASE_URL + "/appusers/login", { username: username.value, password: password.value })
      .then((response) => {
        login(response.data, password.value);
        history.push("/");
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  return (
    <div className="page-style">
      <TitleComponent title="Logowanie" />
      <div className="page-wrapper">
        <form className="form-style">
          <TextInput
            label="Login: "
            value={username.value}
            placeholder="Wpisz login"
            onAssign={setUsername}
          />
          <TextInput
            label="Hasło: "
            placeholder="Wpisz hasło"
            fieldType="password"
            value={password.value}
            onAssign={setPassword}
          />
          <Button
            variant="outline-success"
            style={loginButtonStyle}
            onClick={loginButtonOnClick}
          >
            Zaloguj
          </Button>

          <Button
            variant="outline-primary"
            style={loginButtonStyle}
            onClick={()=>history.push("/register")}
          >
            Rejestracja
          </Button>
        </form>
      </div>
      <StatementComponent statement={statement} />
    </div>
  );
};

const loginButtonStyle = {
  width: "100%",
  marginTop: "30px",
};

export default LoginPage;
