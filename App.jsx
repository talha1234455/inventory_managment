import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import ViewProducts from "./pages/ViewProducts";
import SearchProduct from "./pages/SearchProduct";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "hsl(230, 20%, 13%)",
            color: "hsl(0, 0%, 95%)",
            border: "1px solid hsla(0,0%,100%,0.08)",
            borderRadius: "12px",
            fontSize: "0.875rem",
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/products" element={<ViewProducts />} />
            <Route path="/search" element={<SearchProduct />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
