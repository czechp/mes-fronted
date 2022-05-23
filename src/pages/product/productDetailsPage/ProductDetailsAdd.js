// @ts-nocheck
import TextInput from "components/TextInput/TextInput";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ProductDetailsAdd = ({ onAdd }) => {
    const [content, setContent] = useState({
        value: "",
        valid: false
    });

    const addOnClick = () => {
        if (content.valid) {
            onAdd(content.value);
            setContent({
                value: "",
                valid: false
            });
        }
    }

    return (
        <div className=""
            style={productDetailsAddStyle}>
            <TextInput
                value={content.value}
                label={"Dodaj:"}
                onAssign={setContent}
                placeholder="Wpisz treść nowej właściwości ..."
                minLength={3}
                maxLength={70}
            />
            <Button variant="outline-success" style={{ width: "100%" }} disabled={!content.valid} onClick={addOnClick}>Dodaj</Button>
        </div>
    );
}

const productDetailsAddStyle = {
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

export default ProductDetailsAdd;