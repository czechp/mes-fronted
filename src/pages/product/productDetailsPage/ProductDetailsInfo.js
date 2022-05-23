import React from "react";
import { translateProductType } from "utilities/commonUtilities";

const ProductDetailsInfo = ({ product }) => {

    return (
        <div className="section-style">
            <div className="info-form-style" >
                <p className="info-form-row-style">
                    <span>Id:</span>
                    <span>{product.id}</span>
                </p>
                <p className="info-form-row-style">
                    <span>Nazwa:</span>
                    <span>{product.name}</span>
                </p>
                <p className="info-form-row-style">
                    <span>Dział:</span>
                    <span>{translateProductType(product.productType)}</span>
                </p>
            </div>
        </div>
    );
}

export default ProductDetailsInfo;
