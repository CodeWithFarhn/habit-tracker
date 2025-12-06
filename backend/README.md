# ZenTask Server (Backend)

The REST API for **ZenTask**, built with **Node.js**, **Express**, and **MongoDB**. It handles user authentication, data persistence, and business logic for tasks and habits.

## Key Features

- **Secure Auth**: JWT-based authentication with bcrypt password hashing.
- **Advanced Models**:
  - **Habit**: Recurring items with automatic *Streak Calculation* logic.
  - **Task**: One-time items with priority, status, and due dates.
- **Performance**: Database indexing on frequently queried fields (`user`, `status`, `dueDate`).
- **Validation**: Strict Mongoose schema validation for data integrity.

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Security**: `bcryptjs`, `jsonwebtoken`
- **Utilities**: `dotenv`, `cors`, `express-async-handler`

## Database Schema

### User
*   `name`, `email`, `password` (hashed)
*   `bio`: Customizable user bio
*   `notifications`: Preferences object (push, email)

### Task
*   `title`, `description`
*   `category`: *work*, *personal*, *health*
*   `priority`: *low*, *medium*, *high*
*   `dueDate` (Indexed)
*   `status`: *pending*, *completed*

### Habit
*   `name`, `frequency` (*daily*, *weekly*)
*   `completedDates`: Array of ISO strings
*   `streak`: Auto-calculated integer (Indexed)

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env` file in this directory:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/zentask (or Atlas URI)
    JWT_SECRET=your_secure_random_string
    ```

3.  **Run Server:**
    ```bash
    npm run dev  # Uses nodemon for auto-reload
    # OR
    npm start    # Standard node execution
    ```
    Server runs on `http://localhost:5000`.

## API Routes

| Resource | Route | Description |
| :--- | :--- | :--- |
| **Auth** | `/api/auth` | Signup, Login, User Profile |
| **Tasks** | `/api/tasks` | CRUD operations for tasks |
| **Habits** | `/api/habits` | CRUD operations for habits |
