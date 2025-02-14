import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Product } from "./ProductList";

interface EditProductProps {
  product: Product;
  handleUpdate: (updatedProduct: Product) => Promise<void>; // Update to handle asynchronous function
  handleCancel: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({
  product,
  handleUpdate,
  handleCancel,
}) => {
  const [editingProduct, setEditingProduct] = useState<Product>(product);

  return (
    <div className={styles.editProduct}>
      <h2>Edit Product</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleUpdate(editingProduct); // Handle asynchronous function
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
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
