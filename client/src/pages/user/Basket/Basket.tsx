import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import styles from "./styles.module.scss";

interface Product {
  id: number;
  name: string;
  cost: number;
  imageData: string;
  category: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

const Basket = () => {
  const { user } = useContext(UserContext) || {};
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/carts/user/${user.id}/items`
        );
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("There was an error fetching the cart items!", error);
      }
    };

    fetchCartItems();
  }, [user]);

  const placeOrder = async () => {
    if (user) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/orders/from-cart/${user.id}`,
          { method: "POST" }
        );
        if (response.ok) {
          alert("Order placed successfully!");
        } else {
          alert("Failed to place order.");
        }
      } catch (error) {
        console.error("There was an error placing the order!", error);
      }
    }
  };

  return (
    <div className={styles.basket}>
      <h1>Your Basket</h1>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            {item.product.imageData && (
              <img
                src={`data:image/jpeg;base64,${item.product.imageData}`}
                alt={item.product.name}
              />
            )}
            <div>
              <h2>{item.product.name}</h2>
              <p>Category: {item.product.category}</p>
              <p>Cost: ${item.product.cost.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={placeOrder} className={styles.placeOrderButton}>
        Place Order
      </button>
    </div>
  );
};

export default Basket;
