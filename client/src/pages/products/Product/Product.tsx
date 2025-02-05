import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
      {/* Add more product details and functionalities here */}
    </div>
  );
};

export default Product;
