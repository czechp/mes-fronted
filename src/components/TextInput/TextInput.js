import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { max } from "rxjs/operators";

const TextInput = ({
  label,
  placeholder = "",
  minLength = 0,
  maxLength = 30,
  fieldType = "text",
  onAssign,
  value,
  onChange = (text) => {},
}) => {
  const [inputTouched, setInputTouched] = useState(false);
  const validators = {
    minLengthValid: value.length >= minLength,
    maxLengthValid: value.length <= maxLength,
    validated: function () {
      return this.minLengthValid && this.maxLengthValid;
    },
  };

  const inputOnFocus = () => {
    setInputTouched(true);
  };

  const textOnChange = (value) => {
    const dataValidated =
      value.length >= minLength && value.length <= maxLength;
    onChange(value);
    onAssign({ value, valid: dataValidated });
  };

  useEffect(() => {
    if (!value) setInputTouched(false);
  }, [value]);

  return (
    <>
      <Form.Group style={{ width: "100%" }}>
        <Form.Label>
          <h5>{label}</h5>
        </Form.Label>
        <Form.Control
          type={fieldType}
          value={value}
          placeholder={placeholder}
          onFocus={inputOnFocus}
          onChange={(event) => {
            textOnChange(event.target.value);
          }}
          style={{
            border: inputTouched && !validators.validated() && "2px solid red",
          }}
        />
        {inputTouched && !validators.minLengthValid && (
          <Form.Text style={{ color: "red" }}>
            Pole musi miec conajmniej {minLength} znaków
          </Form.Text>
        )}
        {inputTouched && !validators.maxLengthValid && (
          <Form.Text style={{ color: "red" }}>
            Pole może miec maksymalnie {maxLength} znaków
          </Form.Text>
        )}
      </Form.Group>
    </>
  );
};

export default TextInput;
