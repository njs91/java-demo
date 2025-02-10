import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import CreateProduct from "./CreateProduct";
import ProductList from "./ProductList";
import EditProduct from "./EditProduct";
import styles from "./styles.module.scss";

/*
    lists users and products
    
    functionality:
    - CRUD a product:
      - create nearly done - needs image upload
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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/products/${productId}?username=${user?.username}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setProducts(
          products.filter((product) => product.productId !== productId)
        );
      } else {
        console.error("There was an error deleting the product!");
      }
    } catch (error) {
      console.error("There was an error deleting the product!", error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (updatedProduct: Product) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/products/${updatedProduct.productId}?username=${user?.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      if (response.ok) {
        setProducts(
          products.map((product) =>
            product.productId === updatedProduct.productId
              ? updatedProduct
              : product
          )
        );
        setEditingProduct(null);
      } else {
        console.error("There was an error updating the product!");
      }
    } catch (error) {
      console.error("There was an error updating the product!", error);
    }
  };

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

      <ProductList
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          handleUpdate={handleUpdate}
          handleCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default AdminManagement;
