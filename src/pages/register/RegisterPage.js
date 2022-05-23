import { Button } from "react-bootstrap";
import { useState } from "react";
import StatementComponent from "../../components/Statement/StatementCompnent";
import TitleComponent from "../../components/Title/TitleComponent";
import TextInput from "../../components/TextInput/TextInput";
import "../../GlobalStyle.css";
import axios from "axios";
import { BASE_URL } from "../../services/URL";
import { httpErrorHandler } from "../../services/HttpService";
import { useHistory } from "react-router-dom";
import React from "react";

const RegisterPage = () => {
  const history = useHistory();

  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });

  const [login, setLogin] = useState({
    value: "",
    valid: false,
  });

  const [password, setPassword] = useState({
    value: "",
    valid: false,
  });

  const [passwordConf, setPasswordConf] = useState({
    value: "",
    valid: false,
  });

  const [email, setEmail] = useState({
    value: "",
    valid: false,
  });

  const passwordsNotEqual =
    password.value.length > 0 && password.value !== passwordConf.value;

  const register = () => {
    if (formValidated) {
      const registerBody = {
        username: login.value,
        password: password.value,
        passwordConf: passwordConf.value,
        email: email.value,
      };
      
      axios
        .post(BASE_URL + "/appusers/register", registerBody)
        .then((response) => {
          setStatement({
            content:
              "Rejestracja zakończona. Aby aktywować konto napisz na pczech@bispol.pl",
            isError: false,
          });
          setTimeout(() => history.push("/login"), 4000);
        })
        .catch((error) => {
          setStatement(httpErrorHandler(error));
        });
    } else {
      setStatement({
        content: "Sprawdź poprawność wszystkich pól",
        isError: true,
      });
    }
  };

  const formValidated =
    login.valid &&
    password.valid &&
    passwordConf.valid &&
    email.valid &&
    !passwordsNotEqual;

  return (
    <div className="page-style">
      <TitleComponent title="Rejestracja" />
      <div className="page-wrapper">
        <form className="form-style">
          <TextInput
            value={login.value}
            label="Login:"
            onAssign={setLogin}
            placeholder="Wpisz login..."
            minLength={2}
          />
          <TextInput
            value={password.value}
            label="Hasło:"
            onAssign={setPassword}
            placeholder="Wpisz hasło..."
            minLength={5}
            fieldType="password"
          />
          <TextInput
            value={passwordConf.value}
            label="Powtórz hasło:"
            onAssign={setPasswordConf}
            placeholder="Potwierdź hasło..."
            minLength={5}
            fieldType="password"
          />
          <TextInput
            value={email.value}
            label="Email:"
            onAssign={setEmail}
            placeholder="Wpisz adres email..."
            minLength={8}
          />

          {passwordsNotEqual && (
            <p style={{ color: "red" }}>Hasła nie są identyczne</p>
          )}
          <Button
            style={{ width: "100%", marginTop: "50px" }}
            variant="outline-primary"
            disabled={!formValidated}
            onClick={register}
          >
            Rejestracja
          </Button>
        </form>
      </div>

      <StatementComponent statement={statement} />
    </div>
  );
};

export default RegisterPage;
