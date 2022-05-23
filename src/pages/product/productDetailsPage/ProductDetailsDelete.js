import ModalDialogComponent from "components/ModalDialog/ModalDialogComponent";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../../../GlobalStyle.css";

const ProductDetailsDelete = ({ product, onDelete }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const acceptOnClick = () => {
        setShowDeleteModal(false);
        onDelete();
    }
    return (
        <div className="section-style">
            <Button variant="outline-danger" style={{ width: "100%" }} onClick={() => { setShowDeleteModal(true) }}>Usuń</Button>
            <ModalDialogComponent
                showModal={showDeleteModal}
                header={`Potwierdzenie usunięcia ${product.name}`}
                body={`Czy napewno chcesz usunąć ${product.name}?`}
                acceptFunction={acceptOnClick}
                declineFunction={() => { setShowDeleteModal(false) }}
            />
        </div>
    );
}


export default ProductDetailsDelete;