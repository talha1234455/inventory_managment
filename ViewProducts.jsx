import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import { HiOutlineX } from "react-icons/hi";

const toastStyle = {
  style: {
    background: "hsl(230, 20%, 13%)",
    color: "hsl(0, 0%, 95%)",
    border: "1px solid hsla(0,0%,100%,0.08)",
  },
  iconTheme: {
    primary: "hsl(160, 80%, 50%)",
    secondary: "hsl(0, 0%, 95%)",
  },
};

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products", toastStyle);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({
      ...product,
      quantity: String(product.quantity),
      price: String(product.price),
    });
  };

  const handleUpdate = async (productData) => {
    try {
      await API.put(`/products/${editingProduct.id}`, productData);
      toast.success(`"${productData.name}" updated!`, toastStyle);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update product", toastStyle);
      throw err;
    }
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/products/${deletingProduct.id}`);
      toast.success(`"${deletingProduct.name}" deleted`, {
        ...toastStyle,
        iconTheme: { primary: "hsl(0, 80%, 60%)", secondary: "hsl(0, 0%, 95%)" },
      });
      setDeletingProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product", toastStyle);
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">All Products</h1>
        <p className="page-subtitle">
          Manage your inventory — {products.length} product{products.length !== 1 ? "s" : ""} total
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Product Inventory</h2>
        </div>
        <ProductTable
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Product</h3>
              <button className="modal-close" onClick={() => setEditingProduct(null)}>
                <HiOutlineX />
              </button>
            </div>
            <div className="modal-body">
              <ProductForm
                initialData={editingProduct}
                onSubmit={handleUpdate}
                submitLabel="Save Changes"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="modal-overlay" onClick={() => setDeletingProduct(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Delete Product</h3>
              <button className="modal-close" onClick={() => setDeletingProduct(null)}>
                <HiOutlineX />
              </button>
            </div>
            <div className="modal-body">
              <p className="confirm-text">
                Are you sure you want to delete{" "}
                <span className="confirm-product-name">"{deletingProduct.name}"</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeletingProduct(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete} id="confirm-delete">
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
