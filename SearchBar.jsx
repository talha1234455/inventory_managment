import { HiOutlineSearch } from "react-icons/hi";

export default function SearchBar({ value, onChange, placeholder = "Search products by name or ID..." }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="search-input"
      />
      <HiOutlineSearch className="search-icon" />
    </div>
  );
}
