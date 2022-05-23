import axios from "axios";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";
import "../../../GlobalStyle.css";
import ProductPageListTab from "./ProductPageListTab";
import ProductPageAddTab from "./ProductPageAddTab";

const ProductPage = () => {
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined,
  });

  const history = useHistory();

  const [products, setProducts] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const productsOnAssign = (products) => {
    setProducts(products);
  };

  const getProducts = () => {
    axios
      .get(BASE_URL + "/products")
      .then((response) => {
        setProducts(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  const addProduct = (product) => {
    axios
      .post(BASE_URL + "/products", product)
      .then((response) => {
        setStatement({
          content:
            "Dodano nowy produkt. Zostaniesz przekierowany aby uzupełnić szczegóły produktu",
          isError: false,
        });
        setTimeout(() => {
          history.push(`/product-details/${response.data.id}`);
        }, 3000);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="page-style">
      <TitleComponent title="Produkty" />
      {loaded && (

        <div className="page-wrapper">
          <Tabs defaultActiveKey="list" fill justify style={{ width: "80%" }}>
            <Tab eventKey="list" title="Produkty">
              <ProductPageListTab
                products={products}
                onAssign={productsOnAssign}
              />
            </Tab>
            <Tab eventKey="add" title="Dodaj">
              <ProductPageAddTab addProduct={addProduct} />
            </Tab>
          </Tabs>
        </div>

      )}

      {!loaded && (<LoadSpinnerComponent />)}
      <StatementComponent statement={statement} />
    </div>
  );
};

export default ProductPage;
