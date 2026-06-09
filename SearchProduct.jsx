import { useState, useEffect, useCallback } from "react";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";

const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Accessories",
  "Clothing",
  "Food & Beverage",
  "Office Supplies",
  "Other",
];

export default function SearchProduct() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q, cat) => {
    if (!q.trim() && !cat) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const { data } = await API.get(`/products/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(cat)}`);
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      search(query, category);
    }, 350);
    return () => clearTimeout(timer);
  }, [query, category, search]);

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Search Products</h1>
        <p className="page-subtitle">
          Find products by name or ID
        </p>
      </div>

      <div style={{ marginBottom: "var(--space-xl)", display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <SearchBar value={query} onChange={setQuery} placeholder="Search products by name or ID..." />
        </div>
        <select
          className="form-select"
          style={{ width: "auto", minWidth: "200px" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {searched && (
        <div className="card slide-up">
          <div className="card-header">
            <h2 className="card-title">
              Search Results
            </h2>
            <span className="badge badge-category">
              {results.length} found
            </span>
          </div>
          <ProductTable
            products={results}
            loading={loading}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
      )}
    </div>
  );
}
