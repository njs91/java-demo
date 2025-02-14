import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { UserContext } from "../../../context/UserContext";
import { Product } from "../../admin/Management/ProductList";

/*
  @todo:
  - bugs: users can add to cart, refresh page, and then the add to cart button is not disabled for products already in the cart
*/

const Products = () => {
  const { user } = useContext(UserContext) || {};
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
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/carts/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id, // Ensure the correct key is used
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
    return cart.some((product) => product.id === productId); // Ensure the correct key is used
  };

  return (
    <div className={styles.products}>
      <h1>Products</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            {product.imageData && (
              <img
                src={`data:image/jpeg;base64,${product.imageData}`}
                alt={product.name}
                className={styles.productImage}
              />
            )}
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Cost: ${product.cost.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              disabled={isInCart(product.id)}
              className={isInCart(product.id) ? styles.disabledButton : ""}
            >
              {isInCart(product.id) ? "In Cart" : "Add to Basket"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
