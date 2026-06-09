import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "inventory_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed: ", err.message);
    } else {
        console.log("MySQL Connected to inventory_db");
        connection.release();
    }
});

const db = pool.promise();

export default db;
