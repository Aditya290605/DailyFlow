<div align="center">
  
  # 🌊 DailyFlow
  
  **Master your day with powerful analytics and seamless task management.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

  [View Demo](#) · [Report Bug](https://github.com/Aditya290605/DailyFlow/issues) · [Request Feature](https://github.com/Aditya290605/DailyFlow/issues)

</div>

---

## 🚀 Overview

**DailyFlow** isn't just a todo list; it's a productivity ecosystem. Designed for those who love data, it gamifies your daily progress with a GitHub-style **Contribution Graph**, giving you visual feedback on your consistency. 

Whether you're tracking coding streaks, workout habits, or project tasks, DailyFlow transforms your daily grind into a satisfying visual journey.

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>📊 Visual Analytics</h3>
      <p>Go beyond checkboxes. Track your daily completion rates, view weekly trends, and analyze your productivity over time.</p>
    </td>
    <td width="50%">
      <h3>📅 Contribution Graph</h3>
      <p>A beautiful, interactive heatmap that visualizes your activity intensity. Fill your grid and keep the streak alive!</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔐 Secure Authentication</h3>
      <p>Enterprise-grade security with JWT (JSON Web Tokens) and bcrypt password hashing. Your data is yours alone.</p>
    </td>
    <td width="50%">
      <h3>🎨 Modern UX/UI</h3>
      <p>Experience a buttery-smooth interface featuring glassmorphism, dark mode, and responsive animations powered by Tailwind CSS.</p>
    </td>
  </tr>
</table>

---

## �️ Tech Stack

This project is built on the **MERN** stack, optimized for performance and scalability.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | Component-based UI Architecture |
| **Styling** | ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?logo=tailwind-css&logoColor=white) | Utility-first CSS framework |
| **Build Tool** | ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | Next Generation Frontend Tooling |
| **Backend** | ![Node](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | JavaScript Runtime |
| **API** | ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | Web Framework for Node.js |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) | NoSQL Database |

---

## ⚡ Getting Started

Get up and running locally in minutes.

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Atlas or Local)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/Aditya290605/DailyFlow.git
    cd DailyFlow/taskmaster
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    PORT=5002
    MONGODB_URI=your_connection_string
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run Locally**
    ```sh
    # Start Backend & Frontend Dev Server
    npm run dev
    # (Existing setup might require running backend separately: node server/index.js)
    ```

---

## 🌍 Deployment

Designed for seamless deployment on platforms like **Render**, **Vercel**, or **Heroku**.

### Single-Service Deployment (Recommended)
This repository determines the environment automatically. In production, the Node.js backend serves the compiled React frontend.

1.  **Build Command**: `npm install && npm run build`
2.  **Start Command**: `npm start`
3.  **Env Variables**: Set `NODE_ENV=production`

---

## 📂 Project Structure

```bash
taskmaster/
├── 📂 server/             # Express.js Backend
│   ├── 📂 models/         # Mongoose Schemas
│   ├── 📂 routes/         # API Route definitions
│   └── 📄 index.js        # Main Server Entry
├── 📂 src/                # React Frontend
│   ├── 📂 components/     # Reusable UI Atoms
│   ├── 📂 pages/          # Dashboard, Analytics, Login
│   └── 📂 services/       # API Integration
└── 📄 package.json        # Unified Dependencies
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by <b>Aditya Magar</b></p>
  <p>
    <a href="https://github.com/Aditya290605">GitHub</a> • 
    <a href="https://linkedin.com/in/aditya-magar">LinkedIn</a>
  </p>
</div>
