# Modern Inventory Management System

**Reengineered from a Legacy FORTRAN 77 System**

This project is a complete, end-to-end modernization of a legacy single-file FORTRAN 77 inventory system. It has been transformed into a fully featured, 3-tier web application using modern technologies and architectural patterns.

---

## 🚀 Tech Stack

- **Frontend:** React, Vite, React Router, CSS Custom Properties (Glassmorphism & Dark Theme)
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Architecture:** MVC (Model-View-Controller), REST API

## ✨ Key Features

- **Dynamic Dashboard:** Real-time metrics showing total products, stock levels, category counts, and low-stock alerts.
- **Product Management (CRUD):** Seamlessly add, view, edit, and delete products from the inventory.
- **Smart Search:** Debounced, real-time search functionality. Filter products instantly by name, ID, or Category dropdown.
- **Premium UI/UX:** A highly responsive, modern dark-themed interface featuring glassmorphism, gradient accents, and micro-animations.

---

## 📁 Folder Structure

```plaintext
legacysystem/
│
├── backend/                  # Node.js + Express API
│   ├── config/               # Database configuration
│   ├── controllers/          # API route logic and queries
│   ├── routes/               # API endpoints
│   ├── sql/                  # MySQL schema and seed data
│   ├── package.json
│   └── server.js             # Entry point (Port 5000)
│
├── frontend/                 # React + Vite UI
│   ├── public/               
│   ├── src/                  
│   │   ├── components/       # Reusable UI components (Navbar, Tables, Forms)
│   │   ├── pages/            # Application views (Dashboard, Add, View, Search)
│   │   ├── services/         # Axios API connection
│   │   ├── App.jsx           # Main routing
│   │   ├── index.css         # Global design system
│   │   └── main.jsx          # Entry point (Port 5173)
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 🛠️ Local Setup Instructions

This project is configured to run locally using XAMPP and Node.js.

### 1. Prerequisites
- **XAMPP** (or any local MySQL server)
- **Node.js** (v16 or higher)

### 2. Database Initialization
1. Open your **XAMPP Control Panel** and start the **MySQL** module.
2. Open your terminal or command prompt.
3. Import the database schema and seed data by running:
   ```cmd
   c:\xampp\mysql\bin\mysql -u root < backend\sql\schema.sql
   ```
   *(Alternatively, you can import `backend/sql/schema.sql` via phpMyAdmin at `http://localhost/phpmyadmin`)*

### 3. Start the Backend API
Open a new terminal window, navigate to the `backend` folder, install dependencies, and start the server:
```bash
cd backend
npm install
npm run dev
```
*(The backend will start running on `http://localhost:5000`)*

### 4. Start the Frontend UI
Open another terminal window, navigate to the `frontend` folder, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
*(The frontend will start running on `http://localhost:5173`)*

---

## 🧠 How This Shows Reengineering

| Legacy FORTRAN 77   | Modern System            |
| ------------------- | ------------------------ |
| `inventory.txt`     | MySQL database           |
| Console terminal    | React Web UI             |
| GOTO-based logic    | REST API structure       |
| Single file program | MVC architecture         |
| Manual file storage | Structured relational DB |
