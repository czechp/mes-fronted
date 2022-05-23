import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import {
  getUsername,
  isLogin,
  logout,
  loginSubject,
} from "../../services/AuthorizationService";

const TopBarAccount = () => {
  const [reload, setReload] = useState(true);
  const history = useHistory();

  useEffect(() => {
    loginSubject.subscribe({
      next: () => {
        setReload(!reload);
      },
    });
  }, [reload]);

  const onClickLogout = () => {
    logout();
    setReload(!reload);
    history.push("/login");
  };

  return (
    <div className="">
      <div className="" style={{ marginTop: "15px" }}>
        {!isLogin() && (
          <div className="">
          <Button
            variant="outline-success"
            style={buttonStyle}
            onClick={() => {
              history.push("/login");
            }}
          >
            Logowanie
          </Button>
          <Button
            variant="outline-primary"
            style={{...buttonStyle, marginLeft: "15px"}}
            onClick={() => {
              history.push("/register");
            }}
          >
            Rejestracja
          </Button>
          </div>

          
        )}
      </div>
      {isLogin() && (
        <div className="">
          <p style={usernameInfoStyle}>
            Zalogowany: <b>{getUsername()}</b>
          </p>
          <div className="" style={buttonSectionStyle}>
            <Button
              variant="outline-danger"
              style={{...buttonStyle, width: "100%"}}
              onClick={onClickLogout}
            >
              Wyloguj
            </Button>
            {/* <Button variant="outline-success" style={buttonStyle}>
              Moje konto
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
};

const usernameInfoStyle = {
  width: "100%",
  dispaly: "flex",
  justifyContent: "center",
};

const buttonSectionStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const buttonStyle = {
  width: "40%",
};
export default TopBarAccount;
