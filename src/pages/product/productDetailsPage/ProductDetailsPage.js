import axios from "axios";
import LoadSpinnerComponent from "components/LoadSpinner/LoadSpinnerComponent";
import StatementComponent from "components/Statement/StatementCompnent";
import TitleComponent from "components/Title/TitleComponent";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { httpErrorHandler } from "services/HttpService";
import { BASE_URL } from "services/URL";

import "../../../GlobalStyle.css";
import ProductDetailsDelete from "./ProductDetailsDelete";
import ProductDetailsEfficencies from "./ProductDetailsEfficencies";
import ProductDetailsInfo from "./ProductDetailsInfo";
import ProductDetailsProperties from "./ProductDetailsProperties";


const ProductDetailsPage = () => {
  // @ts-ignore
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const [statement, setStatement] = useState({
    content: "",
    isError: undefined
  })

  const [product, setProduct] = useState({
    id: 0,
    name: ""
  });

  const [lineNames, setLineNames] = useState([]);


  const getProduct = () => {
    axios.get(BASE_URL + `/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoaded(true);
        getLineNames(response.data.productType);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      })
  }

  const deleteProduct = () => {
    axios.delete(`${BASE_URL}/products/${product.id}`)
      .then((response) => {
        setStatement({
          content: `Produkt "${product.name}"" usunięty.`,
          isError: false
        });
        setTimeout(() => {
          history.push("/products");
        }, 2000);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      })
  }

  const deleteProductProperty = (productPropertyId) => {
    axios.delete(`${BASE_URL}/product-properties/${productPropertyId}`)
      .then((response) => {
        setStatement({
          content: "Właściwość produktu usunięta.",
          isError: false
        });
        getProduct();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error))
      })
  }

  const addProductProperty = (content) => {
    const body = {
      content
    }
    axios.post(`${BASE_URL}/products/properties/${product.id}`, body)
      .then((response) => {
        setStatement({
          content: "Właściwość została dodana",
          isError: false
        });
        getProduct();
      })
      .catch((error) => {
        httpErrorHandler(error);
      })
  }

  const deleteProductEfficient = (productEfficientId) => {
    axios.delete(`${BASE_URL}/product-efficiencies/${productEfficientId}`)
      .then((response) => {
        setStatement({
          content: "Wydajność została usnięta",
          isError: false
        });
        getProduct();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error))
      })
  }

  const getLineNames = (productType) => {
    axios.get(`${BASE_URL}/lines/product-type`, { params: { productType } })
      .then((response) => {
        setLineNames(response.data);
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      })
  }

  const addProductEfficient = (efficient) => {
    axios.post(`${BASE_URL}/products/product-efficiencies/${product.id}`, efficient)
      .then((response) => {
        setStatement({
          content: "Wydajność została dodana",
          isError: false
        });
        getProduct();
      })
      .catch((error) => {
        setStatement(httpErrorHandler(error));
      })
  }



  useEffect(() => {
    getProduct();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-style">
      <TitleComponent title="Szczegóły produktu" />
      {loaded && (
        <div className="page-wrapper">
          <ProductDetailsInfo product={product} />
          <ProductDetailsDelete product={product} onDelete={deleteProduct} />
          <ProductDetailsProperties product={product} onDelete={deleteProductProperty} onAdd={addProductProperty} />
          <ProductDetailsEfficencies product={product} onDelete={deleteProductEfficient} onAdd={addProductEfficient} lineNames={lineNames} />
        </div>
      )}
      {
        !loaded && (<LoadSpinnerComponent />)
      }
      <StatementComponent statement={statement} />
    </div>


  );
};

export default ProductDetailsPage;
