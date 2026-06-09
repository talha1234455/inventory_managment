import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { HiOutlineCube } from "react-icons/hi2";

export default function ProductTable({ products, onEdit, onDelete, loading = false }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <HiOutlineCube />
        </div>
        <h3 className="empty-state-title">No products found</h3>
        <p className="empty-state-text">
          There are no products to display. Add a new product to get started.
        </p>
      </div>
    );
  }

  const getStockBadge = (qty) => {
    if (qty <= 5) return <span className="badge badge-danger">Critical</span>;
    if (qty < 10) return <span className="badge badge-warning">Low</span>;
    return <span className="badge badge-success">In Stock</span>;
  };

  return (
    <div className="table-container">
      <table className="data-table" id="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="fade-in" style={{ animationDelay: `${index * 30}ms` }}>
              <td style={{ color: "var(--text-muted)", fontWeight: 500 }}>#{product.id}</td>
              <td style={{ fontWeight: 600 }}>{product.name}</td>
              <td>
                <span className="badge badge-category">{product.category || "—"}</span>
              </td>
              <td style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{product.quantity}</td>
              <td style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                ${Number(product.price).toFixed(2)}
              </td>
              <td>{getStockBadge(product.quantity)}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn btn-icon btn-secondary"
                    onClick={() => onEdit(product)}
                    title="Edit product"
                    id={`edit-product-${product.id}`}
                  >
                    <HiOutlinePencil />
                  </button>
                  <button
                    className="btn btn-icon btn-danger"
                    onClick={() => onDelete(product)}
                    title="Delete product"
                    id={`delete-product-${product.id}`}
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
