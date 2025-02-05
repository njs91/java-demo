import React, {
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import styles from "./styles.module.scss";

const AdminManagement = () => {
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    cost: 0,
    image: "",
    category: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role === "user") {
      navigate("/user/profile");
    }
  }, [user, navigate]);

  if (!user) return null;

  const { username, role } = user;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      if (response.ok) {
        setMessage("Product created successfully");
      } else {
        setError("There was an error creating the product!");
      }
    } catch (error) {
      setError("There was an error creating the product!");
    }
  };

  /*
    lists users and products
    
    functionality:
    - CRUD a product
    - CRUD a user
    - filter by order/cost/whatever
    - search for a user
  */
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

      <div className={styles.createProduct}>
        <h2>Create a new product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Cost:</label>
            <input
              type="number"
              name="cost"
              value={product.cost}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Create Product</button>
        </form>
        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default AdminManagement;
