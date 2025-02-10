import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import CreateProduct from "./CreateProduct";
import styles from "./styles.module.scss";

/*
    lists users and products
    
    functionality:
    - CRUD a product:
      - create nearly done - needs image upload
      - need read
      - need update
      - need delete
    - CRUD a user:
      - need create
      - need read
      - need update
      - need delete
    - filter by order/cost/whatever
    - search for a user
  */

interface Product {
  productId: number;
  name: string;
  cost: number;
  image: string;
  category: string;
}

const AdminManagement = () => {
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (user?.role === "user") {
      navigate("/user/profile");
    }
  }, [user, navigate]);

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

  if (!user) return null;

  const { username, role } = user;

  return (
    <div className={styles.adminManagement}>
      <div className={styles.header}>
        <h1>Admin Management</h1>
        <p>
          Welcome {username}. Your role: {role}
        </p>
        <p>
          <Link to="/change-password">Change your password</Link>.
        </p>
      </div>

      <CreateProduct />

      <div className={styles.productList}>
        <h2>Product List</h2>
        <ul>
          {products.map(({ productId, name, cost, category, image }) => (
            <li key={productId}>
              <p>Name: {name}</p>
              <p>Cost: {cost}</p>
              <p>Category: {category}</p>
              <img src={image} alt={name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminManagement;
