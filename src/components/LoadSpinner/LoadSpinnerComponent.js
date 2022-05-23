import React from "react";
import { Spinner } from "react-bootstrap";

const LoadSpinnerComponent = () => {

    return (
        <div className="" style={{marginTop: "300px"}}>
            <Spinner animation="grow" role="status" style={{marginLeft: "10px"}} />
            <Spinner animation="grow" role="status" style={{marginLeft: "10px"}} />
            <Spinner animation="grow" role="status" style={{marginLeft: "10px"}} />
            <Spinner animation="grow" role="status" style={{marginLeft: "10px"}} />
            <Spinner animation="grow" role="status" style={{marginLeft: "10px"}} />
            <Spinner animation="grow" role="status" style={{marginLeft: "10px"}} />
            <Spinner animation="grow" role="status" style={{marginLeft: "10px"}} />
        </div>
    );
}

export default LoadSpinnerComponent;