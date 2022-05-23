import { useEffect, useState } from "react";

const StatementComponent = ({ statement }) => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (statement.isError !== undefined) {
      setVisibility(true);
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    }
  }, [statement]);

  
  return (
    <>
      {visibility && (
        <div
          className="fixed-bottom "
          style={{
            ...statementStyle,
            backgroundColor: statement.isError ? "#dc3545" : "#28a745",
          }}
        >
          {statement.content}
        </div>
      )}
    </>
  );
};

const statementStyle = {
  minHeight: "75px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "25px",
  opacity: "75%",
};

export default StatementComponent;
