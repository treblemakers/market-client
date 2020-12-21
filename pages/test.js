import React from "react";

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

const test = () => {
  const { data } = useQuery(GET_PRODUCTS);
  //console.log(data)

  return (
    <div>
      test page
      <br />
      <br />
      {data &&
        data.products.map((prod) => (
          <div>
            {prod.name}
            <br />
            {prod.price}
          </div>
        ))}
    </div>
  );
};

export default test;
