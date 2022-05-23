import TextInput from "components/TextInput/TextInput";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { productionTypeArray } from "utilities/commonUtilities";
import "../../../GlobalStyle.css";


const ProductPageAddTab = ({ addProduct }) => {
  const [name, setName] = useState({
    value: "",
    valid: false,
  });

  const [productType, setProductType] = useState({
    value: "PTS",
    valid: true,
  });


  const formValidated = name.valid && productType.valid;

  const addProductOnClick = () => {
    if (formValidated) {
      addProduct({
        name: name.value,
        productType: productType.value,
      });
    }
  };

  const productTypeOnChange = (event)=>{
    setProductType(
      {
        value: event.target.value,
        valid: true
      }
    );
  }
  return (
    <div className="page-wrapper">
      <form action="form-style" style={{ width: "40%", marginTop: "10px" }}>
        <TextInput
          value={name.value}
          label="Nazwa:"
          onAssign={setName}
          placeholder="Wpisz nazwę produktu..."
          minLength={3}
        />
        <Form.Group>
          <Form.Label>Typ produktu:</Form.Label>
          <Form.Control as="select" defaultValue="PTS" onChange={productTypeOnChange}>
          {productionTypeArray.map((product)=>(<option value={product.value}>{product.display}</option>))}
          </Form.Control>
        </Form.Group>

        <Button
          variant="outline-success"
          style={{ width: "100%", marginTop: "10px" }}
          disabled={!formValidated}
          onClick={addProductOnClick}
        >
          Dodaj
        </Button>
      </form>
    </div>
  );
};

export default ProductPageAddTab;
