import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalDialogComponent from "components/ModalDialog/ModalDialogComponent";
import React, { useState } from "react";

const DeleteIconComponent = ({ onDelete = () => { }, header, body }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="">
            <span><FontAwesomeIcon icon={faTrashAlt} color="red" style={{ cursor: "pointer" }} onClick={() => { setShowModal(true); }} /></span>
            <ModalDialogComponent
                showModal={showModal}
                header={header}
                body={body}
                acceptFunction={onDelete}
                declineFunction={() => { setShowModal(false); }}
            />
        </div>
    );
}

export default DeleteIconComponent;