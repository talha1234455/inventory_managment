import express from "express";
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getDashboardStats
} from "../controllers/productController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);
router.get("/products/search", searchProducts);
router.get("/products", getProducts);
router.post("/products", addProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
