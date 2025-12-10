# Project Technical Report: ZenTask

## 1. Project Overview
**ZenTask** is a full-stack productivity application designed to help users manage tasks and track habits. It features a modern, responsive user interface and a robust RESTful API backend.

## 2. Technology Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Language**: JavaScript (ES Modules)
- **Styling**: Bootstrap 5, React Bootstrap, Custom CSS
- **State Management**: React Context API (`AuthContext`)
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Icons**: React Bootstrap Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose 8
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Bcryptjs (Password Hashing), CORS

### Development Tools
- **Orchestration**: `concurrently` (Run client/server simultaneously)
- **Linting**: ESLint
- **Live Reload**: Nodemon (Backend), Vite HMR (Frontend)

## 3. Data Structures & Schema Design

The application uses MongoDB with Mongoose schemas to model data.

### 3.1 User (`User.js`)
Stores user profile and authentication data.
- **Fields**:
  - `name`: String (Required)
  - `email`: String (Required, Unique)
  - `password`: String (Hashed via bcrypt)
  - `bio`: String
  - `notifications`: Object (Preferences for email, push, etc.)
- **Key Features**:
  - Pre-save hook for password hashing.
  - `matchPassword` method for login verification.

### 3.2 Task (`Task.js`)
Represents a single todo item.
- **Fields**:
  - `user`: ObjectId (Ref: User, Indexed)
  - `title`: String (Required)
  - `description`: String
  - `category`: String (Enum: work, personal, health)
  - `priority`: String (Enum: low, medium, high)
  - `dueDate`: Date
  - `status`: String (Enum: pending, completed)
- **Indexing**: Optimized for filtering by User, Category, Status, and DueDate.

### 3.3 Habit (`Habit.js`)
Tracks recurring habits and streaks.
- **Fields**:
  - `user`: ObjectId (Ref: User, Indexed)
  - `name`: String (Required)
  - `description`: String
  - `frequency`: String (Enum: daily, weekly)
  - `completedDates`: Array of Strings (ISO date strings)
  - `streak`: Number
- **Key Features**:
  - `streak` counter for gamification.
  - Compound index on `{ user: 1, streak: -1 }` for leaderboard/dashboard queries.

## 4. Data Structures & Algorithms Implementation

### 4.1 Sorting & Filtering
- **Backend (Streaks)**: The `updateHabit` controller implements a custom algorithm using **Array.prototype.sort()** on date strings to calculate habit streaks. It compares consecutive dates in descending order to determine the current run.
- **Frontend (Dashboard)**: The `Dashboard` component uses **Array.prototype.filter()** and **reduce()** patterns to compute real-time statistics (e.g., completion rates, category distribution) from the raw task list.
- **Indexing**: MongoDB B-Tree indexes are configured on `dueDate`, `status`, and `category` fields to optimize future sort/filter queries at the database level.

### 4.2 Searching
- **Current State**: The application currently relies on strict exact-match querying (e.g., finding all tasks for a specific user ID).
- **Optimization**: MongoDB indexes are in place (`index: true` in schemas) to ensure these lookups are $O(\log n)$ rather than full collection scans.

## 5. Architecture

### Frontend Architecture
- **Services Layer**: `src/services/` (api.js, authService.js, etc.) decouples API logic from UI components.
- **Context API**: `AuthContext` provides global access to the current user state and login/logout methods.
- **Pages & Components**: Modular structure separating full-page views (`pages/`) from reusable UI blocks (`components/`).

### Backend Architecture
- **REST API**: Standard RESTful endpoints (GET, POST, PUT, DELETE).
- **Middleware**: Custom `authMiddleware` (implied) to protect private routes using JWT verification.
- **Error Handling**: `express-async-handler` for clean async error management.
