# 🛒 E-Commerce Backend with Payment Integration

A complete backend system for an e-commerce application built with Node.js and Express.  
This project simulates how real-world online stores manage users, products, carts, orders, and secure payments.

The goal of this project was to understand how modern backend systems handle **authentication, cart management, order processing, inventory updates, and payment verification**.

---

# 🚀 Features

### 🔐 Authentication System
- Secure user authentication using **JWT (JSON Web Tokens)**
- Protected routes using authentication middleware
- User-based cart and order management

### 📦 Product Management
- Create and manage products
- Store product details such as:
  - name
  - price
  - description
  - stock quantity

### 🛒 Cart System
- Add items to cart
- Update quantity
- Remove items
- View current cart items

### 📋 Order Management
- Convert cart items into orders during checkout
- Calculate total order value
- Store order history for each user

### 📉 Inventory Management
- Prevent overselling
- Automatically reduce product stock when an order is placed

### 💳 Payment Integration
Integrated payment workflow using **Razorpay**:

1. Backend creates a payment order
2. User completes payment through Razorpay checkout
3. Razorpay returns payment details
4. Backend verifies payment using signature verification

This ensures the payment is **secure and tamper-proof**.

---

# 🧰 Tech Stack

Backend
- Node.js
- Express.js

Database
- MySQL

Authentication
- JWT (JSON Web Tokens)

Payment Gateway
- Razorpay

Testing Tools
- Postman

---

# 🏗 System Architecture

```
Client
   │
   ▼
Express API Server
   │
   ├── Authentication (JWT)
   ├── Product APIs
   ├── Cart APIs
   ├── Order APIs
   └── Payment APIs
   │
   ▼
MySQL Database
```

---

# 💳 Payment Flow

```
User clicks Pay
        │
        ▼
Backend creates Razorpay Order
        │
        ▼
Razorpay Checkout opens
        │
        ▼
User completes payment
        │
        ▼
Razorpay returns:
- razorpay_order_id
- razorpay_payment_id
- razorpay_signature
        │
        ▼
Backend verifies payment signature
        │
        ▼
Payment confirmed
```

---

# 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|------|------|------|
POST | /api/auth/register | Register user
POST | /api/auth/login | Login user

---

### Products

| Method | Endpoint | Description |
|------|------|------|
GET | /api/products | Get all products
POST | /api/products | Create product

---

### Cart

| Method | Endpoint | Description |
|------|------|------|
POST | /api/cart/add | Add item to cart
GET | /api/cart | View cart
DELETE | /api/cart/:id | Remove item from cart

---

### Orders

| Method | Endpoint | Description |
|------|------|------|
POST | /api/orders/checkout | Create order
GET | /api/orders | Get user orders

---

### Payments

| Method | Endpoint | Description |
|------|------|------|
POST | /api/payments/create-order | Create Razorpay order
POST | /api/payments/verify | Verify payment signature

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/project-name.git
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

### 4️⃣ Start Server

```
npm start
```

Server runs on:

```
http://localhost:5000
```

---

# 🧪 Testing

You can test the APIs using:

- Postman
- Thunder Client

Example workflow:

1. Register/Login user
2. Add products
3. Add items to cart
4. Checkout
5. Create Razorpay order
6. Complete payment
7. Verify payment

---

# 📚 What I Learned

This project helped me understand:

- Real-world backend architecture
- REST API design
- Secure authentication with JWT
- Database relationships
- Cart and order processing logic
- Payment gateway integration
- Signature verification for secure transactions

---

# 🔮 Future Improvements

- Order status management
- Payment webhooks
- Refund system
- Admin dashboard
- Product search & filtering
- Rate limiting & security improvements

---

# 👨‍💻 Author

Akash Sharma

Passionate about building backend systems, learning new technologies, and exploring how real-world software works behind the scenes.

---

⭐ If you found this project interesting, feel free to give it a star!