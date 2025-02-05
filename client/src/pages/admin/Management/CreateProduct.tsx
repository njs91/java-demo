import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.scss";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    cost: 0,
    image: "",
    category: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className={styles.createProduct}>
      <h2>Create a new product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cost">Cost:</label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={product.cost}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
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
  );
};

export default CreateProduct;
