CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO products (name, quantity, price, category) VALUES
('Laptop Dell XPS 15', 25, 1299.99, 'Electronics'),
('Office Chair Ergonomic', 50, 249.99, 'Furniture'),
('Wireless Mouse Logitech', 150, 29.99, 'Accessories'),
('USB-C Hub 7-in-1', 75, 49.99, 'Accessories'),
('Standing Desk Frame', 10, 399.99, 'Furniture'),
('Mechanical Keyboard', 3, 89.99, 'Accessories'),
('27" 4K Monitor', 8, 549.99, 'Electronics'),
('Noise Cancelling Headphones', 2, 199.99, 'Electronics');
