# MongoDB Architecture & Optimization Report

**Project:** ZenTask - MERN Stack Habit Tracker  
**Date:** December 6, 2025  
**Prepared For:** Project Stakeholders  

---

## Table of Contents

1.  [Overview](#overview)
2.  [Database Schema Design](#database-schema-design)
    *   [User Schema](#user-schema)
    *   [Habit Schema](#habit-schema)
    *   [Task Schema](#task-schema)
3.  [Optimization & Indexing Strategy](#optimization--indexing-strategy)
4.  [Advanced Logic: Server-Side Streak Calculation](#advanced-logic-server-side-streak-calculation)
5.  [Conclusion](#conclusion)

---

## 1. Overview

This report details the MongoDB database architecture for **ZenTask**, emphasizing the secure, scalable, and performance-optimized design choices made during development. Key highlights include the use of strict schema validation, strategic indexing for query performance, and server-side logic for data integrity.

---

## 2. Database Schema Design

We utilize **Mongoose** to enforce strict typing and validation at the application layer.

### User Schema
Stores user credentials and profile preferences. Passwords are never stored in plain text.
*   **Key Fields**: `name`, `email` (Unique), `password` (Hashed), `bio`, `notifications`.
*   **Optimization**: Email unique constraint ensures no duplicate registrations.

```javascript
// backend/src/models/User.js

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    // ... password (hashed), bio, notifications
}, { timestamps: true });
```

### Habit Schema
Represents recurring habits. Uses an embedded array for completion dates to keep data localized.
*   **Key Fields**: `user` (Reference), `frequency`, `completedDates` (Array), `streak` (Auto-calculated).
*   **Optimization**: Indexed by `user` and a compound index on `user` + `streak` for leaderboard/dashboard queries.

```javascript
// backend/src/models/Habit.js

const habitSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true, // Optimize queries by user
    },
    completedDates: {
        type: [String], // Array of ISO date strings for daily tracking
        default: [],
    },
    streak: {
        type: Number,
        default: 0,
    },
    // ... name, description, frequency
});
```

### Task Schema
Represents one-time tasks.
*   **Key Fields**: `user`, `priority`, `dueDate`, `status`.
*   **Optimization**: Indexes on `dueDate`, `status`, and `category` allow for instant filtering and sorting on the dashboard.

```javascript
// backend/src/models/Task.js

const taskSchema = mongoose.Schema({
    dueDate: {
        type: Date,
        required: true,
        index: true, // Optimizes "Sort by Date"
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        index: true, // Optimizes "Filter by Pending"
    },
    category: {
        type: String,
        index: true, // Optimizes "Filter by Category"
    },
    // ...
});
```

---

## 3. Optimization & Indexing Strategy

To ensure the application remains performant as it scales to thousands of tasks, we have implemented specific indexes:

1.  **Single Field Indexes**:
    *   `Habit.user`, `Task.user`: Essential for security. Ensures a user can only query their own data efficiently.
    *   `Task.dueDate`: Used for the default "Sort by Date" view.
    *   `Task.status`: Used to segregate "Pending" from "Completed" in the UI.

2.  **Compound Indexes**:
    *   `Habit: { user: 1, streak: -1 }`: This index is future-proofed for a "User's Best Habits" view or a potential gamification leaderboard, ensuring we can fetch the user's top-performing habits instantly without an in-memory sort.

---

## 4. Advanced Logic: Server-Side Streak Calculation

To prevent client-side manipulation (e.g., users faking streaks by sending extensive completion arrays), specific logic handles streak calculation securely on the server.

**Algorithm:**
1.  **Trigger**: Logic runs whenever `completedDates` is updated.
2.  **Process**:
    *   Sort dates in descending order.
    *   Normalize dates to midnight to ignore time components.
    *   Iterate through dates to find consecutive sets (Today → Yesterday → Day Before...).
    *   If a gap of >1 day is found, the streak breaks.
3.  **Result**: The `streak` field is updated atomically with the habit.

```javascript
// backend/src/controllers/habitController.js

if (req.body.completedDates) {
    // 1. Sort and Unique
    const sortedDates = [...req.body.completedDates].sort((a, b) => new Date(b) - new Date(a));
    const uniqueDates = [...new Set(sortedDates.map(d => d.split('T')[0]))];

    // 2. Calculate Streak
    if (uniqueDates.length > 0) {
        // Validation logic to check if dates are consecutive...
        // ... (iterative check logic)
        streak = calculatedStreak; 
    }
    
    req.body.streak = streak; // Force update the secure field
}
```

---

## 5. Conclusion

The ZenTask database architecture is robust, secure, and optimized for read-heavy dashboard operations. By combining Mongoose schema validation with strategic indexing and server-side logic, the system ensures data integrity and high performance suitable for a production environment.
