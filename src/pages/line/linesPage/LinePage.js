import axios from "axios";
import React, { useEffect, useState } from "react";

import "../../../GlobalStyle.css";
import LineCategoryTiles from "./LineCategoryTiles";
import ColorExplanation from "../../../components/ColorExplanation/ColorExplanation";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import colors from "configuration/colors";

const LinePage = () => {
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });
  const [loaded, setLoaded] = useState(false);
  const [lines, setLines] = useState([]);

  const getLines = () => {
    axios
      .get(BASE_URL + "/lines")
      .then((response) => {
        setLines(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  useEffect(() => {
    getLines();
    const getLineInterval = setInterval(() => {
      getLines();
    }, 10000);

    return () => {
      clearInterval(getLineInterval);
    };
  }, []);

  return (
    <div className="page-style">
      <TitleComponent title="Linie" />
      {loaded && (
        <div className="" style={{ display: "flex", justifyContent: "center" }}>
          <div className="page-wrapper" style={{ width: "90%" }}>
            <ColorExplanation
            title="Linie"
              data={[
                { text: "Linia pracuje", color: colors.success },
                { text: "Linia wyłączona", color: colors.secondary },
                { text: "Awaria", color: colors.danger },
              ]}
            />
            <LineCategoryTiles
              title="PTS"
              lines={lines.filter((line) => line.productionType === "PTS")}
            />
            <LineCategoryTiles title="TeaLight" lines={[]} />
            <LineCategoryTiles title="Wkład olejowy" lines={[]} />
            <LineCategoryTiles title="Wkład prasowany" lines={[]} />
          </div>
        </div>
      )}

      {!loaded && <LoadSpinnerComponent />}
      <StatementComponent statement={statement} />
    </div>
  );
};

export default LinePage;
