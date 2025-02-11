import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, UserContext } from "../../../context/UserContext";
import CreateProduct from "./CreateProduct";
import ProductList from "./ProductList";
import EditProduct from "./EditProduct";
import styles from "./styles.module.scss";
import EditUser from "./EditUser";

/*
    lists users and products
    
    functionality:
    - CRUD a product:
      - create nearly done - needs image upload
    - CRUD a user:
      - need create
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
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/users`
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };

    fetchProducts();
    fetchUsers();
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/search?username=${searchQuery}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("There was an error searching for users!", error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
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

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user?.username }),
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user.userId !== id));
        if (user?.userId === id && setUser) {
          setUser(null);
          navigate("/login");
        }
      } else {
        console.error("There was an error deleting the user!");
      }
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
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

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (updatedUser: User, newPassword: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/${updatedUser.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user?.username,
            updatedUsername: updatedUser.username,
            newPassword,
            role: updatedUser.role,
          }),
        }
      );
      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.userId === updatedUser.userId ? updatedUser : user
          )
        );
        setEditingUser(null);
      } else {
        console.error("There was an error updating the user!");
      }
    } catch (error) {
      console.error("There was an error updating the user!", error);
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
        handleEdit={handleEditProduct}
        handleDelete={handleDeleteProduct}
      />

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          handleUpdate={handleUpdateProduct}
          handleCancel={() => setEditingProduct(null)}
        />
      )}

      <div className={styles.userList}>
        <h2>All Users</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username"
          />
          <button type="submit">Search</button>
        </form>
        <ul>
          {users.map((user) => (
            <li key={user.userId?.toString()}>
              <p>ID: {user.userId}</p>
              <p>Username: {user.username}</p>
              <p>Role: {user.role}</p>
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.userId)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {editingUser && (
        <EditUser
          user={editingUser}
          handleUpdate={handleUpdateUser}
          handleCancel={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};

export default AdminManagement;
