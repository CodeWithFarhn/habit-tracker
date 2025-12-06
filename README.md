# ZenTask - Task & Habit Tracker

A modern, responsive productivity application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). ZenTask allows users to manage daily tasks, build long-term habits, and track their progress with insightful analytics.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Documentation](#api-documentation)
- [Responsive Design](#responsive-design)
- [License](#license)

## Features

### Core Functionality
- **Task Management**: Create, edit, delete, and organize one-time tasks with priorities and due dates.
- **Habit Tracking**: Build daily or weekly habits and track streaks.
- **Smart Sorting**: Items are automatically sorted by status (pending first) and due date.
- **Dashboard Analytics**: View completion rates, pending counts, active habits, and your best streak.
- **Category Visualization**: Interactive donut chart showing task distribution (Work, Personal, Health).

### User Experience (UX)
- **Responsive Design**: Mobile-first layout with a collapsible sidebar and optimized touch targets.
- **Real-time Feedback**: Toast notifications for all major actions (create, update, delete).
- **Dark/Light Mode**: (Coming Soon foundation laid in CSS variables).
- **Accessibility**: Semantic HTML and ARIA labels for screen reader support.

### Security
- **Authentication**: Secure Signup/Login with JWT (JSON Web Tokens).
- **Protected Routes**: Dashboard and Settings are inaccessible without a valid session.
- **Password Security**: Passwords are hashed using `bcryptjs`.

### Advanced Data
- **Streaks**: Server-side logic automatically calculates habit streaks based on completion history.
- **User Profile**: Persist custom bio and notification preferences.

## Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **UI Library**: React Bootstrap
- **Styling**: Custom CSS & Bootstrap Utilities
- **State Management**: Context API (AuthContext)
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT & BcryptJS

## Project Structure

```plaintext
root/
├── backend/
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controllers/    # Business logic (Auth, Habits, Tasks)
│   │   ├── models/         # Mongoose Schemas (User, Habit, Task)
│   │   ├── routes/         # API Routes
│   │   ├── middleware/     # Auth protection
│   │   └── server.js       # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components (Sidebar, Forms)
│   │   ├── context/        # Global State (Auth)
│   │   ├── pages/          # Main Views (Dashboard, Auth, Landing)
│   │   ├── services/       # API integration (Axios)
│   │   └── App.jsx         # Main Router
│   └── package.json
└── README.md
```

## Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd habit-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/zentask" >> .env
echo "JWT_SECRET=your_super_secret_key" >> .env

# Start Server
npm run dev
```
*Backend runs on `http://localhost:5000`*

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Start Client
npm run dev
```
*Frontend runs on `http://localhost:5173`*

## API Documentation

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| **Auth** | | | |
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| PUT | `/api/auth/profile` | Update bio/notifications | **Yes** |
| **Tasks** | | | |
| GET | `/api/tasks` | Get all tasks | **Yes** |
| POST | `/api/tasks` | Create task | **Yes** |
| PUT | `/api/tasks/:id` | Update task status/details | **Yes** |
| DELETE | `/api/tasks/:id` | Delete task | **Yes** |
| **Habits** | | | |
| GET | `/api/habits` | Get all habits | **Yes** |
| POST | `/api/habits` | Create habit | **Yes** |
| PUT | `/api/habits/:id` | Update habit/streak | **Yes** |
| DELETE | `/api/habits/:id` | Delete habit | **Yes** |

## Responsive Design

The application is fully responsive across devices:
- **Mobile (<768px)**: Navigation moves to a top bar with a hamburger menu. Cards stack vertically.
- **Tablet (768px - 1024px)**: Sidebar appears, grid adjusts to 2 columns.
- **Desktop (>1024px)**: Full 4-column dashboard layout with persistent sidebar.

## License

This project is open source and available under the [MIT License](LICENSE).
