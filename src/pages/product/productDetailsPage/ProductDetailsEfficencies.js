import DeleteIconComponent from "components/DeleteIcon/DeleteIconComponent";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ProductDetailsEfficienciesAdd from "./ProductDetailsEfficienciesAdd";

const ProductDetailsEfficencies = ({ product, onDelete, onAdd, lineNames }) => {

    return (
        <div className="section-style">
            <h2>Wydajności:</h2>
            <ProductDetailsEfficienciesAdd onAdd={onAdd} product={product} lineNames={lineNames}/>
            <ListGroup>
                <ListGroupItem>
                    <span>Id:</span>
                    <span>Linia:</span>
                    <span>Wydajność:</span>
                    <span>Usuń:</span>
                </ListGroupItem>
                {
                    product.productEfficients.map((pe, idx) =>
                        <ListGroupItem key={`${idx}-${pe.id}`}>
                            <span>{pe.id}</span>
                            <span>{pe.lineName}</span>
                            <span>{pe.amount}</span>
                            <DeleteIconComponent
                                header="Potwierdzenie usunięcia wydajności"
                                body="Czy napewno chcesz usunąć tą wydajność?"
                                onDelete={() => { onDelete(pe.id) }} />
                        </ListGroupItem>
                    )
                }
            </ListGroup>
        </div>
    );
}

export default ProductDetailsEfficencies;