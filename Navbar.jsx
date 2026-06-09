import { NavLink } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlinePlusCircle,
  HiOutlineClipboardList,
  HiOutlineSearch,
} from "react-icons/hi";
import { HiOutlineCube } from "react-icons/hi2";

const navItems = [
  { to: "/", icon: <HiOutlineViewGrid />, label: "Dashboard" },
  { to: "/add", icon: <HiOutlinePlusCircle />, label: "Add Product" },
  { to: "/products", icon: <HiOutlineClipboardList />, label: "View Products" },
  { to: "/search", icon: <HiOutlineSearch />, label: "Search" },
];

export default function Navbar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <HiOutlineCube />
          </div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">InvenTrack</span>
            <span className="sidebar-brand-label">Inventory System</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-nav-label">Main Menu</span>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-link-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-footer-text">
          Reengineered from FORTRAN 77
          <br />
          © 2026 InvenTrack
        </p>
      </div>
    </aside>
  );
}
