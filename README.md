# ZenTask - Task & Habit Tracker

A modern, responsive productivity application for managing tasks and building habits. Built with React and Tailwind CSS on the frontend and Node.js with Express and MongoDB on the backend.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Next Steps](#next-steps)

## Project Overview

ZenTask is a productivity tool that helps users:
- Manage one-time tasks with priorities and due dates
- Track recurring habits (daily, weekly, monthly)
- View completion statistics and category distribution on a dashboard
- Organize tasks by category (Work, Personal, Health, Other)

The application follows a backend-driven architecture where frontend actions trigger API requests, backend validation and database updates, and responses update the UI accordingly.

## Features

### Frontend (React + Tailwind CSS)

**Responsive Layout**
- Desktop: Sidebar and Dashboard side-by-side
- Mobile: Collapsible sidebar with top navigation bar
- Fully responsive cards and grid layouts

**Sidebar (Left Panel)**
- Task and Habit management interface
- Search functionality for filtering tasks
- Tab filters: All, Task, Habit
- Status dropdown: All, Pending, Completed, Overdue
- Task list with priority badges, due dates, and category tags
- Mobile overlay sidebar with close button

**Dashboard (Main View)**
- Blue gradient header
- Statistics cards (responsive grid):
  - Completion Rate (%)
  - Pending Tasks count
  - Active Habits count
  - Best Streak (days)
- Category Distribution card
- Fully responsive layout

**Task Detail View**
- Task and Habit information display
- Mark Complete, Edit, and Delete actions
- Category and priority badges
- Description and created timestamp

**Task/Habit Form**
- Modal interface for creating and editing
- Form validation
- Support for categories, priorities, and due dates
- Frequency option for habits

### Backend (Node.js + Express + MongoDB)

**Folder Structure**
backend/
  src/
    ├── config/          # Database configuration
    ├── models/          # MongoDB schemas
    ├── routes/          # API route definitions
    ├── controllers/     # Business logic
    ├── middleware/      # Custom middleware
    └── server.js        # Express application

**API Endpoints**
- Tasks: Create, Read, Update, Delete, Mark Complete
- Habits: Create, Read, Update, Delete, Log Completion
- Dashboard Statistics

## Project Structure

### Frontend

frontend/src/
├── components/
│   ├── Dashboard.jsx
│   ├── Sidebar.jsx
│   ├── TaskDetail.jsx
│   ├── TaskForm.jsx
│   └── UI/
│       └── CustomSelect.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.html
└── index.css

### Backend

backend/src/
├── config/
│   └── database.js
├── models/
│   ├── Task.js
│   ├── Habit.js
│   └── User.js
├── routes/
│   ├── tasks.js
│   ├── habits.js
│   └── stats.js
├── controllers/
│   ├── taskController.js
│   ├── habitController.js
│   └── statsController.js
├── middleware/
│   ├── errorHandler.js
│   └── validation.js
└── server.js

## Tech Stack

### Frontend
- React 19 - UI library
- Vite 7.2.4 - Build tool and dev server
- Tailwind CSS - Utility-first CSS framework
- Bootstrap Icons - Icon library
- React Icons - Icon library
- Axios - HTTP client
- React Router v7 - Navigation

### Backend
- Node.js - JavaScript runtime
- Express - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling
- dotenv - Environment variable management
- CORS - Cross-origin resource sharing
- express-validator - Request validation
- nodemon - Development auto-reload

## Setup Instructions

### Prerequisites

- Node.js v18 or higher
- MongoDB installed locally or MongoDB Atlas account
- Git

### Frontend Setup
bash
cd frontend
npm install
npm run dev

Frontend will run on `http://localhost:5173`

### Backend Setup
bash
cd backend
npm install
cp .env.example .env
npm run dev

Backend will run on `http://localhost:5000`

Configure `.env` with your MongoDB connection string:
MONGODB_URI=mongodb://localhost:27017/zentask
PORT=5000

## API Endpoints

### Tasks

GET /api/tasks              # Get all tasks
GET /api/tasks/:id          # Get single task
POST /api/tasks             # Create task
PATCH /api/tasks/:id        # Update task
PATCH /api/tasks/:id/complete   # Mark as completed
DELETE /api/tasks/:id       # Delete task

**POST /api/tasks Request Body:**

{
  "title": "Complete project proposal",
  "description": "Finish the Q4 project proposal",
  "category": "work",
  "priority": "high",
  "dueDate": "2025-12-15T00:00:00.000Z"
}

**Response:**

{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project proposal",
    "category": "work",
    "priority": "high",
    "status": "pending",
    "dueDate": "2025-12-15T00:00:00.000Z",
    "createdAt": "2025-12-03T12:00:00.000Z",
    "updatedAt": "2025-12-03T12:00:00.000Z"
  }
}


### Habits

GET /api/habits             # Get all habits
GET /api/habits/:id         # Get single habit
POST /api/habits            # Create habit
PATCH /api/habits/:id       # Update habit
PATCH /api/habits/:id/log   # Log habit completion
DELETE /api/habits/:id      # Delete habit


### Dashboard Statistics

GET /api/stats/dashboard    # Get dashboard statistics


**Response:**

{
  "success": true,
  "data": {
    "completionRate": 33,
    "pendingTasks": 2,
    "overdueTasks": 1,
    "activeHabits": 1,
    "bestStreak": 7,
    "categoryDistribution": {
      "work": 2,
      "health": 2,
      "personal": 1
    }
  }
}

## Next Steps

### Priority Tasks

1. **Backend Implementation**
   - Implement controller logic for tasks and habits
   - Complete route handlers
   - Add request validation
   - Test all endpoints

2. **Frontend-Backend Integration**
   - Replace sample data with API calls
   - Wire up form submissions
   - Add loading states and error handling
   - Implement success notifications

3. **UI Enhancements**
   - Add category distribution chart
   - Implement empty states
   - Add toast notifications

## License

This project is for learning purposes.
