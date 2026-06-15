import { useState } from "react";
import "../styles/admindashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [mode, setMode] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    itemName: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: ""
  });

  const fetchUsers = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8000/productservice/users",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    setUsers(data);
    setProducts([]);
    setMode("users");
    setEditingProduct(null);

  } catch (error) {
    console.error(error);
    alert("Failed to load users");
  }
};
  const fetchProducts = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8000/productservice/products",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    setProducts(data);
    setUsers([]);
    setMode("products");
    setEditingProduct(null);

  } catch (error) {
    console.error(error);
    alert("Failed to load products");
  }
};

  const handleInputChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };

 const addProduct = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8000/productservice/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          categoryId: parseInt(productForm.categoryId)
        })
      }
    );

    const data = await response.json();

    console.log(data);

    alert("Product added 🔥");

    fetchProducts();

  } catch (error) {
    console.error(error);
    alert("Failed to add product");
  }
};

 const deleteProduct = async (id) => {
  try {

    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:8000/productservice/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Product deleted 🗑");
    fetchProducts();

  } catch (error) {
    console.error(error);
    alert("Failed to delete product");
  }
};

  const startEdit = (product) => {
    setEditingProduct(product.id);

    setProductForm({
      itemName: product.itemName,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId
    });
  };

const updateProduct = async () => {
  try {

    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:8000/productservice/products/${editingProduct}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          categoryId: parseInt(productForm.categoryId)
        })
      }
    );

    alert("Product updated ✏");

    setEditingProduct(null);

    setProductForm({
      itemName: "",
      description: "",
      price: "",
      imageUrl: "",
      categoryId: ""
    });

    fetchProducts();

  } catch (error) {
    console.error(error);
    alert("Failed to update product");
  }
};

  return (
  <div className="admin-page">
    <video autoPlay muted loop className="bg-video">
      <source
        src={`${import.meta.env.BASE_URL}hero.mp4`}
        type="video/mp4"
      />
    </video>

    <div className="admin-card">
      <h1>Admin Dashboard</h1>
      <h2>Welcome Admin</h2>

        <div className="admin-buttons">
          <button onClick={fetchUsers}>
            Manage Users
          </button>

          <button onClick={fetchProducts}>
            Manage Products
          </button>
        </div>

        {mode === "users" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {mode === "products" && (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.itemName}</td>
                    <td>₹{product.price}</td>
                    <td>{product.categoryId}</td>
                    <td>
                      <button
                        onClick={() =>
                          startEdit(product)
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="product-form">
              <h3>
                {editingProduct
                  ? "Edit Product"
                  : "Add Product"}
              </h3>

              <input
                name="itemName"
                placeholder="Product Name"
                value={productForm.itemName}
                onChange={handleInputChange}
              />

              <input
                name="description"
                placeholder="Description"
                value={productForm.description}
                onChange={handleInputChange}
              />

              <input
                name="price"
                placeholder="Price"
                value={productForm.price}
                onChange={handleInputChange}
              />

              <input
                name="imageUrl"
                placeholder="Image URL"
                value={productForm.imageUrl}
                onChange={handleInputChange}
              />

              <input
                name="categoryId"
                placeholder="Category ID"
                value={productForm.categoryId}
                onChange={handleInputChange}
              />

              {editingProduct ? (
                <button onClick={updateProduct}>
                  Update Product
                </button>
              ) : (
                <button onClick={addProduct}>
                  Add Product
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;