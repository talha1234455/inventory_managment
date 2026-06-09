import { useState, useEffect } from "react";
import API from "../services/api";
import StatsCard from "../components/StatsCard";
import {
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineExclamation,
} from "react-icons/hi";
import { HiOutlineArchiveBox } from "react-icons/hi2";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalCategories: 0,
    lowStockCount: 0,
    lowStockItems: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/dashboard");
      setStats(data);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Overview of your inventory management system
        </p>
      </div>

      <div className="stats-grid">
        <StatsCard
          icon={<HiOutlineCube />}
          label="Total Products"
          value={stats.totalProducts}
          detail="Unique items in inventory"
          color="purple"
          className="stagger-1"
        />
        <StatsCard
          icon={<HiOutlineArchiveBox />}
          label="Total Stock"
          value={stats.totalStock.toLocaleString()}
          detail="Units across all products"
          color="blue"
          className="stagger-2"
        />
        <StatsCard
          icon={<HiOutlineClipboardList />}
          label="Categories"
          value={stats.totalCategories || 0}
          detail="Product categories"
          color="green"
          className="stagger-3"
        />
        <StatsCard
          icon={<HiOutlineExclamation />}
          label="Low Stock Alerts"
          value={stats.lowStockCount}
          detail="Items below 10 units"
          color="red"
          className="stagger-4"
        />
      </div>

      {/* Low Stock Alerts */}
      {stats.lowStockItems && stats.lowStockItems.length > 0 && (
        <div className="card slide-up" style={{ animationDelay: "200ms" }}>
          <div className="card-header">
            <h2 className="card-title">⚠️ Low Stock Alerts</h2>
            <span className="badge badge-warning">{stats.lowStockCount} items</span>
          </div>
          <div className="card-body">
            <div className="alert-list">
              {stats.lowStockItems.map((item) => (
                <div key={item.id} className="alert-item">
                  <div>
                    <span className="alert-item-name">{item.name}</span>
                    <span className="badge badge-category" style={{ marginLeft: "0.5rem" }}>
                      {item.category}
                    </span>
                  </div>
                  <span className="alert-item-qty">{item.quantity} left</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
