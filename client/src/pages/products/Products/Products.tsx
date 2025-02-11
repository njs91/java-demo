import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface Product {
  productId: number;
  name: string;
  cost: number;
  image: string;
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/products`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, []);

  console.log("products: ", products);

  return (
    <div className={styles.products}>
      <h1>Products</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.productId} className={styles.productCard}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Cost: ${product.cost.toFixed(2)}</p>
            <button>Add to Basket</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
