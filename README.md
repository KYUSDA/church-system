
# 📖 KYUSDA CHURCH SYSTEM

KYUSDA Church System is a full-stack web application built using the **MERN** stack (MongoDB, Express, React, Node.js) along with **Sanity CMS**. It helps manage church member registration, departments, and supports spiritual development and communication within the church.

---

## 📂 Project Structure

```
church-system/
│
├── admin        # Admin dashboard (React + Redux)
├── client       # User/member frontend (React + Context API)
├── server       # Backend API (Node.js + Express + MongoDB)
└── backend-sanity # Sanity.io CMS for managing content (e.g., departments, families)
```

---

## 🛠️ Technologies Used

* **Frontend**: React.js, Vite, TypeScript, Tailwind CSS, Redux (admin), Context API (client)
* **Backend**: Node.js, Express.js, TypeScript, MongoDB
* **CMS**: Sanity.io
* **State Management**: Redux (Admin), Context API (Client)

---

## 📦 Getting Started

### 🔄 Clone the Repository

```bash
git clone https://github.com/samuelkamotho92/church-system.git
cd church-system
```

---

## ⚙️ Backend (Server)

> Path: `/server`

### 💻 Tech Stack

* Node.js
* Express.js
* MongoDB
* TypeScript

### 🧪 Setup Instructions

1. Navigate to the server folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Run the server in development mode:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

6. Start the server:

   ```bash
   npm start
   ```

---

## 🧾 Sanity Studio (CMS)

> Path: `/backend-sanity`

### 💻 Tech Stack

* Sanity.io (TypeScript CMS)

### 🧪 Setup Instructions

1. Install Sanity CLI globally:

   ```bash
   npm install -g @sanity/cli
   ```

2. Navigate to the Sanity folder:

   ```bash
   cd backend-sanity
   ```

3. Initialize the studio (if not already set up):

   ```bash
   npx sanity init
   ```

4. Start Sanity Studio:

   ```bash
   sanity start
   ```

---

## 🧑‍💼 Admin Panel

> Path: `/admin`

### 💻 Tech Stack

* React + Redux
* TypeScript
* Vite

### 🧪 Setup Instructions

1. Navigate to the admin folder:

   ```bash
   cd admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

---

## 👥 Client (Member App)

> Path: `/client`

### 💻 Tech Stack

* React + Context API
* Vite
* TypeScript
* Tailwind CSS

### 🧪 Setup Instructions

1. Navigate to the client folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

---

## 💡 Notes

* Ensure MongoDB is running before starting the backend server.
* Environment variables must be set correctly in each section (e.g., API URLs, DB URI).
* Use different terminals or process managers (e.g., `concurrently`, `pm2`) to run all services simultaneously.

---

## 🧑‍💻 Author

**Samuel Kamotho**
[GitHub: samuelkamotho92](https://github.com/samuelkamotho92)
