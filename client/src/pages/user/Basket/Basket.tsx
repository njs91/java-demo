import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import styles from "./styles.module.scss";

interface CartItem {
  id: number;
  product: {
    productId: number;
    name: string;
    cost: number;
    image: string;
  };
  quantity: number;
}

const Basket = () => {
  const { user } = useContext(UserContext) || {};
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/carts/${user.id}`
          );
          const data = await response.json();
          console.log("data:", data);
          setCartItems(data.items);
        } catch (error) {
          console.error("There was an error fetching the cart!", error);
        }
      }
    };

    fetchCart();
  }, [user]);

  console.log("cartItems:", cartItems);

  return (
    <div className={styles.basket}>
      <h1>Basket</h1>
      <div className={styles.cartItems}>
        {cartItems?.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.product.image} alt={item.product.name} />
            <div>
              <h2>{item.product.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Cost: ${(item.product.cost * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
