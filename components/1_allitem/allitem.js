import React from "react";
import { Card, Button } from "react-bootstrap";
import Scss from "./allitem.module.scss";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_PRODUCTS = gql`
  {
    products {
      id
      name
      discription
      price
    }
  }
`;

const allitem = () => {
  const { data } = useQuery(GET_PRODUCTS);
  console.log(data);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "fit-content", margin: "auto", marginTop: "50px" }}>
        <div style={{ backgroundColor: "red" }}>
          <div style={{ backgroundColor: "pink", padding: "10px" }}>
            รายการสินค้า
          </div>
          <div className={Scss.item2}>
            {data &&
              data.products.map((prod) => (
                <div>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      style={{ width: "268px", height: "180px" }}
                      src="https://backend.tops.co.th/media//catalog/product/8/8/8859295000255.jpg"
                    />
                    <Card.Body>
                      <Card.Title>{prod.name}</Card.Title>
                      <Card.Text>{prod.discription}</Card.Text>
                      <Button variant="primary">{prod.price}</Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default allitem;
