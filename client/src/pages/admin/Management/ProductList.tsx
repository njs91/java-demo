import React from "react";
import styles from "./styles.module.scss";

interface Product {
  productId: number;
  name: string;
  cost: number;
  category: string;
  imageData: string; // Ensure imageData is included in the Product interface
}

interface ProductListProps {
  products: Product[];
  handleEdit: (product: Product) => void;
  handleDelete: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className={styles.productList}>
      <h2>Product List</h2>
      <ul>
        {products.map(({ productId, name, cost, category, imageData }) => (
          <li key={productId}>
            <p>Name: {name}</p>
            <p>Cost: {cost}</p>
            <p>Category: {category}</p>
            {imageData && (
              <img
                src={`data:image/jpeg;base64,${imageData}`}
                alt={name}
                className={styles.productImage}
              />
            )}
            <button
              onClick={() =>
                handleEdit({ productId, name, cost, category, imageData })
              }
            >
              Edit
            </button>
            <button onClick={() => handleDelete(productId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
