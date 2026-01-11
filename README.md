# Food App Backend

A backend REST API built using **Node.js, Express, and MongoDB** with secure authentication and authorization.  
This project focuses on **clean backend architecture**, **JWT-based authentication**, and **role-based access control**.

---

## Features

- User Registration & Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes using Middleware
- Role-Based Authorization (Admin)
- User Profile API (`/me`)
- Centralized Error Handling
- API Testing using Thunder Client

---

## Backend Flow

Client Request
→ Route
→ Auth Middleware (JWT)
→ Role Middleware (Admin/User)
→ Controller
→ Model
→ MongoDB
→ Response


---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- dotenv
- Thunder Client (for API testing)
  
---

## Project Structure

food-app/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middlewares/
│ ├── config/
│ ├── server.js
│ ├── package.json
│ ├── .env.example
│ └── README.md
│
└── frontend/
└── (to be added)


---

## 🔐 API Endpoints

### Register User
POST /api/v1/auth/register


### Login User

POST /api/v1/auth/login

Returns a JWT token.

### Get Logged-in User Profile

GET /api/v1/auth/me

Requires Authorization header:

Authorization: Bearer <token>


### Admin Only – Get All Users

GET /api/v1/admin/users

---

## API Testing

All APIs are tested using **Thunder Client** inside VS Code.

Tested scenarios:
- Successful registration and login
- Invalid credentials
- Missing or invalid JWT token
- Unauthorized access to protected routes
- Role-based access control (Admin vs User)

---

## Environment Variables

Create a `.env` file inside the `food-app` folder:

PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


---

## How to Run Locally

1. Clone the repository
2. Navigate to food-app folder
   ```bash
   cd food-app
3.Install dependencies
  npm install
4.Add .env file
5.Start the server
  nodemon server.js
6.Server will run on:
  http://localhost:8080











