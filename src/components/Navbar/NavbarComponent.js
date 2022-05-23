import colors from "configuration/colors";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <div className="" style={navbarStyle}>
      <Link style={linkStyle} to="/">
        <Button style={buttonStyle} variant="outline-light">
          Linie
        </Button>
      </Link>

      <Link style={linkStyle} to="/reports/all">
        <Button style={buttonStyle} variant="outline-light">
          Raporty
        </Button>
      </Link>

      <Link style={linkStyle} to="/quality-controls/all">
        <Button style={buttonStyle} variant="outline-light">
          Kontrola jakości
        </Button>
      </Link>


      <Link style={linkStyle} to="/downtimes-list/all">
        <Button style={buttonStyle} variant="outline-light">
          Przestoje
        </Button>
      </Link>

      <Link style={linkStyle} to="/breakdowns-list/all">
        <Button style={buttonStyle} variant="outline-light">
          Awarie
        </Button>
      </Link>



      <Link style={linkStyle} to="/products">
        <Button style={buttonStyle} variant="outline-light">
          Produkty
        </Button>
      </Link>

      <Link style={linkStyle} to="/prod-users">
        <Button style={buttonStyle} variant="outline-light">
          Pracownicy
        </Button>
      </Link>


      <Link style={linkStyle} to="/admin-panel">
        <Button style={buttonStyle} variant="outline-light">
          Zarządzaj systemem
        </Button>
      </Link>
    </div>
  );
};

const navbarStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  padding: "10px",
  backgroundColor: "#232424",
  paddingBottom: "40px"
};

const buttonStyle = {
  width: "100%",
};

const linkStyle = {
  width: "10%",
};

export default NavbarComponent;
