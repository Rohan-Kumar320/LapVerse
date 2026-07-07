# 💻 LapVerse Backend

A modern marketplace backend for buying and selling laptops, built with **Node.js**, **Express.js**, and **MongoDB**. The API supports authentication, product management, image uploads, reviews, wishlist, shopping cart, and order management with role-based authorization.

---

## 🚀 Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing with bcrypt
* Protected Routes
* Role-based Authorization (User / Admin)

### Product Management

* Create Product
* Update Product
* Delete Product
* Get All Products
* Get Single Product
* Multiple Image Upload
* Cloudinary Image Storage
* Product Validation

### Product Search

* Search by Title
* Filter by Brand
* Filter by Price
* Sorting
* Pagination

### Reviews

* Add Review
* Update Review
* Delete Review
* View Product Reviews
* Automatic Average Rating Calculation
* Automatic Review Count

### Wishlist

* Add Product to Wishlist
* Remove Product from Wishlist
* Get Wishlist

### Shopping Cart

* Add to Cart
* Update Quantity
* Remove Product
* View Cart
* Automatic Total Calculation

### Orders

* Place Order
* View My Orders
* View Single Order
* Cancel Order
* Seller Orders
* Admin Order Management
* Update Order Status

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cloudinary
* Multer
* Express Validator
* dotenv

---

## 📂 Project Structure

```
Server/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Rohan-Kumar320/LapVerse.git
```

Navigate to the backend folder:

```bash
cd Server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the development server:

```bash
npm run dev
```

The API will be available at:

```
http://localhost:5000
```

---

## 📌 Main API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/me`

### Products

* GET `/api/products`
* GET `/api/products/:id`
* POST `/api/products`
* PUT `/api/products/:id`
* DELETE `/api/products/:id`

### Reviews

* POST `/api/reviews/:productId`
* GET `/api/reviews/:productId`
* PUT `/api/reviews/:reviewId`
* DELETE `/api/reviews/:reviewId`

### Wishlist

* GET `/api/wishlist`
* POST `/api/wishlist/:productId`
* DELETE `/api/wishlist/:productId`

### Cart

* GET `/api/cart`
* POST `/api/cart/:productId`
* PUT `/api/cart/:productId`
* DELETE `/api/cart/:productId`

### Orders

* POST `/api/orders`
* GET `/api/orders/my-orders`
* GET `/api/orders/seller`
* GET `/api/orders`
* GET `/api/orders/:id`
* PUT `/api/orders/:id/cancel`
* PUT `/api/orders/:id/status`

---

## 🔒 Authorization

### User

* Manage own profile
* Manage own cart
* Manage own wishlist
* Create reviews
* Place orders
* View own orders
* View seller orders for products they own

### Admin

* Manage all products
* View all orders
* Update order status
* Full administrative access

---

## 📈 Future Enhancements

* Coupon System
* Payment Gateway Integration
* Email Notifications
* Forgot Password
* OTP Verification
* Analytics Dashboard
* Sales Reports

---

## 👨‍💻 Author

**Rohan Kumar**

Electronics Engineering Student | MERN Stack Developer | 

---

## 📄 License

This project is intended for educational and portfolio purposes.
