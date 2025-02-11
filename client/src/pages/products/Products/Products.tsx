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

  const addToCart = async (product: Product) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/carts/1/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.productId,
            quantity: 1,
          }),
        }
      );

      if (response.ok) {
        setCart([...cart, product]);
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error(
        "There was an error adding the product to the cart!",
        error
      );
    }
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
