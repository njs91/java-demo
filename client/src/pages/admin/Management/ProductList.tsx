import React from "react";
import styles from "./styles.module.scss";

export interface Product {
  id: number;
  name: string;
  cost: number;
  category: string;
  imageData: string;
}

interface ProductListProps {
  products: Product[];
  handleEdit: (product: Product) => void;
  handleDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  handleEdit,
  handleDelete,
}) => {
  console.log("products: ", products);
  return (
    <div className={styles.productList}>
      <h2>Product List</h2>
      <ul>
        {products.map(({ id, name, cost, category, imageData }) => (
          <li key={id}>
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
                handleEdit({ id, name, cost, category, imageData })
              }
            >
              Edit
            </button>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
