import { useState } from "react";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Accessories",
  "Clothing",
  "Food & Beverage",
  "Office Supplies",
  "Other",
];

const initialState = {
  name: "",
  quantity: "",
  price: "",
  category: "",
};

export default function ProductForm({ onSubmit, initialData = null, submitLabel = "Add Product" }) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!form.quantity || Number(form.quantity) < 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    if (!form.price || Number(form.price) < 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (!form.category) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        name: form.name.trim(),
        quantity: Number(form.quantity),
        price: Number(form.price),
        category: form.category,
      });
      if (!initialData) {
        setForm(initialState);
      }
    } catch (err) {
      // error handled by caller
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fade-in" id="product-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            className="form-input"
            type="text"
            name="name"
            placeholder="e.g. Wireless Keyboard"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="product-category">
            Category
          </label>
          <select
            id="product-category"
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="product-quantity">
            Quantity
          </label>
          <input
            id="product-quantity"
            className="form-input"
            type="number"
            name="quantity"
            min="0"
            placeholder="0"
            value={form.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="product-price">
            Price ($)
          </label>
          <input
            id="product-price"
            className="form-input"
            type="number"
            name="price"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={{ marginTop: "var(--space-xl)", display: "flex", gap: "var(--space-sm)" }}>
        <button type="submit" className="btn btn-primary btn-lg" disabled={loading} id="submit-product">
          {loading ? (
            <>
              <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
