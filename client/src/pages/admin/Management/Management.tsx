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
  */

interface Product {
  productId: number;
  name: string;
  cost: number;
  category: string;
  imageData: string; // Ensure imageData is included in the Product interface
}

interface Order {
  orderId: number;
  user: {
    id: number;
    username: string;
  };
  product: {
    productId: number;
    name: string;
  };
  quantity: number;
  orderDate: string;
}

const AdminManagement = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<User[] | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/orders`
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
      }
    };

    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/search?username=${searchQuery}`
      );
      const data = await response.json();
      setSearchResult(data);
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
        setUsers(users.filter((user) => user.id !== id));
        if (user?.id === id && setUser) {
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
      const formData = new FormData();
      formData.append("product", JSON.stringify(updatedProduct));
      if (updatedProduct.imageData) {
        const imageFile = new Blob([updatedProduct.imageData], {
          type: "image/jpeg",
        });
        formData.append("imageFile", imageFile);
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/products/${updatedProduct.productId}?username=${user?.username}`,
        {
          method: "PUT",
          body: formData,
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
        `${process.env.REACT_APP_SERVER_URL}/users/${updatedUser.id}`,
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
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingUser(null);
      } else {
        console.error("There was an error updating the user!");
      }
    } catch (error) {
      console.error("There was an error updating the user!", error);
    }
  };

  const handleFilterOrders = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/orders/filter-by-date?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("There was an error filtering the orders!", error);
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
        <form onSubmit={handleSearch} className={styles.search}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter username"
          />
          <button type="submit">Search</button>
        </form>
        {searchResult !== null && searchResult.length === 0 && (
          <p>No users found</p>
        )}
        <ul>
          {(searchResult || users).map((user) => (
            <li key={user.id?.toString()}>
              <p>ID: {user.id}</p>
              <p>Username: {user.username}</p>
              <p>Role: {user.role}</p>
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
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

      <div className={styles.orderList}>
        <h2>All Orders</h2>
        <form onSubmit={handleFilterOrders}>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button type="submit">Filter</button>
        </form>
        <ul>
          {orders.map((order) => (
            <li key={order.orderId}>
              <p>Order ID: {order.orderId}</p>
              <p>User: {order.user.username}</p>
              <p>Product: {order.product.name}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Order Date: {order.orderDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminManagement;
