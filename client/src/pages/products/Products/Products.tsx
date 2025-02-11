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
  const [cart, setCart] = useState<Product[]>([]);

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

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const isInCart = (productId: number) => {
    return cart.some((product) => product.productId === productId);
  };

  console.log("cart", cart);

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
            <button
              onClick={() => addToCart(product)}
              disabled={isInCart(product.productId)}
              className={
                isInCart(product.productId) ? styles.disabledButton : ""
              }
            >
              {isInCart(product.productId) ? "In Cart" : "Add to Basket"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
