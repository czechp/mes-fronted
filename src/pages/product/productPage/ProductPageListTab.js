import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  sortArrayByNumber,
  sortArrayByString,
  translateProductType,
} from "utilities/commonUtilities";

const ProductPageListTab = ({ products, onAssign }) => {
  const [sortMultiplier, setSortMultiplier] = useState(1);
  const history = useHistory();

  const toggleMultiplier = () => {
    setSortMultiplier(sortMultiplier * -1);
  };

  const sortByName = () => {
    sortArrayByString(
      products,
      "name",
      sortMultiplier,
      onAssign,
      toggleMultiplier
    );
  };

  const sortByProductType = () => {
    sortArrayByString(
      products,
      "productType",
      sortMultiplier,
      onAssign,
      toggleMultiplier
    );
  };

  const sortById = () => {
    sortArrayByNumber(
      products,
      "id",
      sortMultiplier,
      onAssign,
      toggleMultiplier
    );
  };

  return (
    <div className="">
      <Table variant="dark">
        <thead>
          <tr>
            <th onClick={sortById}>Id:</th>
            <th onClick={sortByName}>Nazwa:</th>
            <th onClick={sortByProductType}>Dział:</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr
              key={`row-${product.id}-${idx}`}
              onClick={() => history.push("/product-details/" + product.id)}
            >
              <td key={`id-${product.id}-${idx}`}>{product.id}</td>
              <td key={`name-${product.id}-${idx}`}>{product.name}</td>
              <td key={`kind-${product.id}-${idx}`}>
                {translateProductType(product.productType)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductPageListTab;
