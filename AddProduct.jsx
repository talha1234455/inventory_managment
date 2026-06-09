import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import ProductForm from "../components/ProductForm";

export default function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = async (productData) => {
    try {
      await API.post("/products", productData);
      toast.success(`"${productData.name}" added successfully!`, {
        style: {
          background: "hsl(230, 20%, 13%)",
          color: "hsl(0, 0%, 95%)",
          border: "1px solid hsla(0,0%,100%,0.08)",
        },
        iconTheme: {
          primary: "hsl(160, 80%, 50%)",
          secondary: "hsl(0, 0%, 95%)",
        },
      });
      navigate("/products");
    } catch (err) {
      toast.error("Failed to add product. Please try again.", {
        style: {
          background: "hsl(230, 20%, 13%)",
          color: "hsl(0, 0%, 95%)",
          border: "1px solid hsla(0,0%,100%,0.08)",
        },
      });
      throw err;
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Add New Product</h1>
        <p className="page-subtitle">
          Fill in the details below to add a new product to your inventory
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Product Details</h2>
        </div>
        <div className="card-body">
          <ProductForm onSubmit={handleSubmit} submitLabel="Add Product" />
        </div>
      </div>
    </div>
  );
}
