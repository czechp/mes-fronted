import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./LineDetailsMenu.css";

const LineDetailsMenu = ({ lineId }) => {
  const history = useHistory();

  return (
    <div className="line-details-menu-container">
      <Button
        variant="outline-light"
        className="line-details-menu-button"
        onClick={() => {
          history.push(`/reports/${lineId}`);
        }}
      >
        Raporty
      </Button>
      <Button
        variant="outline-light"
        className="line-details-menu-button"
        onClick={() => history.push(`/quality-controls/${lineId}`)}
      >
        Kontrola jakości
      </Button>
      <Button variant="outline-light" className="line-details-menu-button" onClick={()=>history.push(`/downtimes-list/${lineId}`)}>
        Przestoje produkcyjne
      </Button>
      <Button variant="outline-light" className="line-details-menu-button" onClick={()=>history.push(`/breakdowns-list/${lineId}`)}>
        Awarie
      </Button>
    </div>
  );
};

export default LineDetailsMenu;
