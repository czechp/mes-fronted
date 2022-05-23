import TextInput from "components/TextInput/TextInput";
import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";

const ProductDetailsEfficienciesAdd = ({ onAdd, product, lineNames }) => {
  const [amountNotNumber, setAmountNotNumber] = useState(false);
  const [amount, setAmount] = useState({
    value: "",
    valid: false,
  });

  const [lineName, setLineName] = useState({
    value: "",
    valid: false,
  });

  const lineNameOnChange = (event) => {
    setLineName({
      value: event.target.value,
      valid: true,
    });
  };

  const addEfficient = () => {
    if (dataValidated && amountIsNumber()) {
      onAdd({
        amount: amount.value,
        lineName: lineName.value,
      });
    }
  };

  const dataValidated = lineName.valid && amount.valid;

  const amountIsNumber = () => {
    if(isNaN(parseInt(amount.value))){
        setAmountNotNumber(true);
        return false;
    }else{
        setAmountNotNumber(false);
        return true;
    }
  };

  useEffect(() => {
    if (lineNames.length > 0)
      setLineName({ valid: true, value: lineNames[0].name });
  }, [lineNames]);

  return (
    <div className="" style={productDetailsEfficienciesAddStyle}>
      {lineNames.length > 0 && (
        <div>
          <FormControl
            as="select"
            value={lineName.value}
            onChange={(event) => {
              lineNameOnChange(event);
            }}
            style={{ marginBottom: "20px" }}
          >
            {lineNames.map((ln, idx) => (
              <option value={ln.name} key={`${idx}-${ln.id}`}>
                {ln.name}
              </option>
            ))}
          </FormControl>
          <TextInput
            value={amount.value}
            label="Ilość:"
            onAssign={setAmount}
            placeholder="Wpisz wydajność na zmiane"
            fieldType="number"
          />
          {amountNotNumber && (
            <p style={{ color: "red" }}>Podaj wartość liczbową</p>
          )}
          <Button
            variant="outline-success"
            style={{ width: "100%" }}
            disabled={!dataValidated}
            onClick={addEfficient}
          >
            Dodaj
          </Button>
        </div>
      )}

      {lineNames.length === 0 && (
        <div>
          <h2>Nie można dodać wydajności</h2>
          <h2>Brak lini przypisanych do tego produktu.</h2>
        </div>
      )}
    </div>
  );
};

const productDetailsEfficienciesAddStyle = {
  marginTop: "20px",
  marginBottom: "20px",
};

export default ProductDetailsEfficienciesAdd;
