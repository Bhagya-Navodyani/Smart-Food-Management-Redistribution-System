# 🌱 Smart Food Management & Redistribution System

A full-stack MERN application designed to reduce food waste by helping users and shop owners manage food efficiently, track expiry dates, and promote sustainable practices such as donation and composting.

---

## 🚀 Features

### 👤 Regular User

* Add and manage food items (vegetables, fruits, cooked food, etc.)
* Track expiry dates with status indicators (Fresh, Near Expiry, Expired)
* Get smart suggestions for food usage
* Perform actions:

  * 🍽️ Consume
  * 🤝 Donate
  * 🐄 Animal Feed
  * 🌱 Compost
  * 🗑️ Waste
* View analytics and waste reduction insights
* Browse marketplace for discounted near-expiry products

---

### 🏪 Shop Owner

* Manage shop inventory (vegetables, fruits, groceries)
* Add, update, and delete products
* Mark near-expiry items and apply discounts
* Donate unsold food items
* Track sales, waste, and donation analytics

---

### 🧑‍💼 Admin

* Manage users and shop owners
* Monitor all food items in the system
* View system-wide analytics
* Manage food categories

---

### 🏢 Organization (Optional)

* Receive food donations
* Accept/reject donation requests
* Track donation history

---

## 🎯 Problem Solved

* Reduces household and business food waste
* Helps users track and manage food effectively
* Promotes sustainable practices like composting and donation
* Supports businesses in selling near-expiry products instead of wasting them

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* Tailwind CSS

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

**Authentication:**

* JWT (JSON Web Tokens)
* Bcrypt (Password hashing)

---

## 📂 Project Structure

```
/client        -> React frontend
/server        -> Node.js backend
  /models      -> Database schemas
  /routes      -> API routes
  /controllers -> Business logic
  /middleware  -> Auth & validation
```

---

## 🔗 API Endpoints (Sample)

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### User Food

* POST `/api/food/add`
* GET `/api/food/all`
* PUT `/api/food/update/:id`
* DELETE `/api/food/delete/:id`

### Shop Products

* POST `/api/products/add`
* GET `/api/products/all`

### Actions

* POST `/api/action/add`
* GET `/api/action/stats`

---

## 🎨 UI Highlights

* Responsive design (mobile-friendly)
* Dark mode support 🌙
* Color indicators:

  * 🟢 Fresh
  * 🟠 Near Expiry
  * 🔴 Expired
* Dashboard with analytics charts

---

## 🌍 Environmental Impact

This system helps:

* Reduce food waste
* Promote eco-friendly practices
* Encourage responsible consumption
* Support agriculture through composting

---

## 🚀 Future Enhancements

* 📱 Mobile application
* 🔔 Notification system (email/SMS)
* 📍 Location-based donation centers
* 🤖 AI-powered recipe suggestions
* 📦 Barcode scanner for food items

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/food-management-system.git
cd food-management-system
```

### 2. Install dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd server
npm install
```

---

### 3. Environment Variables

Create a `.env` file in `/server`:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4. Run the project

#### Start backend

```bash
npm run server
```

#### Start frontend

```bash
npm start
```

---

## 💼 Use Case

This project is ideal for:

* Students learning MERN stack
* Portfolio projects
* Real-world problem solving applications
* Sustainability-focused solutions

---

## 📸 Screenshots (Add Later)

* Dashboard
* Food Management
* Shop Inventory
* Analytics

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Author

Developed as a MERN stack project to solve real-world food waste problems and promote sustainable living 🌱

---
