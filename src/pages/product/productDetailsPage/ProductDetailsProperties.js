import DeleteIconComponent from "components/DeleteIcon/DeleteIconComponent";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ProductDetailsAdd from "./ProductDetailsAdd";

const ProductDetailsProperties = ({ product, onDelete, onAdd }) => {

    return (
        <div className="section-style">
            <h2>Właściwości produktu:</h2>
            <ProductDetailsAdd onAdd={onAdd} />
            <ListGroup>
                <ListGroupItem>
                    <span>Id:</span>
                    <span>Tekst:</span>
                    <span>Usuń:</span>
                </ListGroupItem>
                {
                    product.productProperties.map((pp, idx) => <ListGroupItem key={`${idx}-${pp.id}`}>
                        <span>{pp.id}</span>
                        <span>{pp.content}</span>
                        <DeleteIconComponent
                            onDelete={() => { onDelete(pp.id); }}
                            header="Potwierdzenie usunięcia właściwośći"
                            body="Czy na pewno chcesz usunąć właściwość?" />
                    </ListGroupItem>)
                }
            </ListGroup>


        </div>
    );
}


export default ProductDetailsProperties;