import db from "../config/db.js";

// GET all products
export const getProducts = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ADD product
export const addProduct = async (req, res) => {
    try {
        const { name, quantity, price, category } = req.body;
        if (!name || quantity === undefined || price === undefined) {
            return res.status(400).json({ error: "Name, quantity, and price are required." });
        }
        const [result] = await db.query(
            "INSERT INTO products (name, quantity, price, category) VALUES (?, ?, ?, ?)",
            [name, quantity, price, category]
        );
        res.status(201).json({ id: result.insertId, message: "Product added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE product
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, quantity, price, category } = req.body;
        await db.query(
            "UPDATE products SET name = ?, quantity = ?, price = ?, category = ? WHERE id = ?",
            [name, quantity, price, category, id]
        );
        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE product
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await db.query("DELETE FROM products WHERE id = ?", [id]);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// SEARCH products
export const searchProducts = async (req, res) => {
    try {
        const query = req.query.q || "";
        const category = req.query.category || "";
        
        if (!query && !category) {
            return res.status(200).json([]);
        }

        let sql = "SELECT * FROM products WHERE 1=1";
        const params = [];

        if (query) {
            sql += " AND (name LIKE ? OR id = ?)";
            params.push(`%${query}%`, query);
        }

        if (category) {
            sql += " AND category = ?";
            params.push(category);
        }

        const [rows] = await db.query(sql, params);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
        const [totalProductsResult] = await db.query("SELECT COUNT(*) as count FROM products");
        const [totalStockResult] = await db.query("SELECT SUM(quantity) as sum FROM products");
        const [totalCategoriesResult] = await db.query("SELECT COUNT(DISTINCT category) as count FROM products WHERE category IS NOT NULL AND category != ''");
        const [lowStockCountResult] = await db.query("SELECT COUNT(*) as count FROM products WHERE quantity < 10");
        const [lowStockItemsResult] = await db.query("SELECT * FROM products WHERE quantity < 10");
        
        res.status(200).json({
            totalProducts: totalProductsResult[0].count,
            totalStock: totalStockResult[0].sum || 0,
            totalCategories: totalCategoriesResult[0].count,
            lowStockCount: lowStockCountResult[0].count,
            lowStockItems: lowStockItemsResult
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
