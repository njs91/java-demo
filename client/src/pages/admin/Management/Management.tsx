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

      <div className={styles.productList}>
        <h2>Product List</h2>
        <ul>
          {products.map(({ productId, name, cost, category, image }) => (
            <li key={productId}>
              <p>Name: {name}</p>
              <p>Cost: {cost}</p>
              <p>Category: {category}</p>
              <img src={image} alt={name} />
              <button
                onClick={() =>
                  handleEdit({ productId, name, cost, category, image })
                }
              >
                Edit
              </button>
              <button onClick={() => handleDelete(productId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {editingProduct && (
        <div className={styles.editProduct}>
          <h2>Edit Product</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingProduct);
            }}
          >
            <div>
              <label htmlFor="editName">Name:</label>
              <input
                type="text"
                id="editName"
                name="name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="editCost">Cost:</label>
              <input
                type="number"
                id="editCost"
                name="cost"
                value={editingProduct.cost}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    cost: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="editImage">Image URL:</label>
              <input
                type="text"
                id="editImage"
                name="image"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    image: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="editCategory">Category:</label>
              <input
                type="text"
                id="editCategory"
                name="category"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                required
              />
            </div>
            <button type="submit">Update Product</button>
            <button type="button" onClick={() => setEditingProduct(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
