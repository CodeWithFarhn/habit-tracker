# ZenTask Client (Frontend)

The responsive user interface for **ZenTask**, a modern task and habit tracker. Built with **React 19** and **Vite**, featuring a mobile-first design system using **React Bootstrap**.

## Key Features

- **Authentication**: Sign Up / Login forms with error handling and JWT storage.
- **Dashboard**: Unified view of Tasks (one-time) and Habits (recurring).
- **Responsive Layout**:
  - **Desktop**: Persistent sidebar navigation.
  - **Mobile**: Collapsible `Offcanvas` sidebar and top navigation bar.
- **Components**:
  - `TaskForm`: Semantic form with accessibility attributes (`id`, `name`) for browser autofill.
  - `TaskDetail`: Deep linkable view for editing items.
  - `StatsCard` & `DonutChart`: Visual analytics for productivity.
- **Security**: `ProtectedRoute` wrapper checks for valid session before rendering private pages.

## Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **UI Framework**: [React Bootstrap](https://react-bootstrap.netlify.app/)
- **Icons**: [React Bootstrap Icons](https://www.npmjs.com/package/react-bootstrap-icons)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## Project Structure

```plaintext
src/
├── components/     # Reusable UI (Sidebar, Dashboard, Forms)
├── context/        # AuthProvider (User state management)
├── services/       # API integration (authService, taskService)
├── pages/          # Route Views (AuthPages, DashboardPage)
├── data/           # Constants and helpers
└── index.css       # Global styles & variables
```

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Ensure `.env` exists with your backend URL:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5173`.

4.  **Build for Production:**
    ```bash
    npm run build
    ```
