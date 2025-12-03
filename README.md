## Project Structure

### Frontend

```plaintext
frontend/
└── src/
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
    ├── index.html
    └── index.css
```

### Backend

```plaintext
backend/
└── src/
    ├── config/         # Database configuration
    │   └── database.js
    ├── models/         # MongoDB schemas
    │   ├── Task.js
    │   ├── Habit.js
    │   └── User.js
    ├── routes/         # API endpoints
    │   ├── tasks.js
    │   ├── habits.js
    │   └── stats.js
    ├── controllers/    # Request handlers and business logic
    │   ├── taskController.js
    │   ├── habitController.js
    │   └── statsController.js
    ├── middleware/     # Custom middleware
    │   ├── errorHandler.js
    │   └── validation.js
    └── server.js       # Express app entry point
```
