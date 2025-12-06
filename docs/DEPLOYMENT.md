# Deployment Guide: Hosting ZenTask for Free

This guide outlines how to host your MERN stack application using the best free-tier services available:

*   **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Free M0 Cluster)
*   **Backend**: [Render](https://render.com/) (Free Web Service)
*   **Frontend**: [Vercel](https://vercel.com/) (Free Static Hosting)

---

## 1. Database: MongoDB Atlas

Since your local database (`mongodb://localhost...`) won't be accessible to the cloud, you need a cloud database.

1.  **Create Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  **Create Cluster**: Select **Build a Database** -> **Shared** (Free) -> **Create**.
3.  **Setup User**: Create a database user (e.g., `admin`) and password. **Save this password!**
4.  **Network Access**: Go to **Network Access** -> **Add IP Address** -> **Allow Access from Anywhere** (`0.0.0.0/0`).
    *   *Note: This is necessary for Render/Vercel to connect.*
5.  **Get Connection String**:
    *   Click **Connect** -> **Drivers** -> **Node.js**.
    *   Copy the string: `mongodb+srv://admin:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`
    *   Replace `<password>` with your actual password.

---

## 2. Backend: Render

Render is excellent for hosting Node.js/Express APIs.

1.  **Push Code**: Ensure your latest code is on GitHub.
2.  **Sign Up**: Log in to [Render](https://render.com/) with GitHub.
3.  **New Web Service**: Click **New +** -> **Web Service**.
4.  **Connect Repo**: Select your `habit-tracker` repository.
5.  **Direct the Build**:
    *   Render needs to know where the backend code lives. Since your backend is in a subfolder (`backend/`), we need to tell it that.
    *   **Root Directory**: `backend`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
6.  **Environment Variables**:
    *   Scroll down to **Environment Variables**.
    *   Add `MONGODB_URI`: Paste your Atlas connection string.
    *   Add `JWT_SECRET`: Enter a secure random string.
    *   Add `NODE_ENV`: `production`
7.  **Deploy**: Click **Create Web Service**.
    *   *Wait for the build to finish. Once live, Render will give you a URL (e.g., `https://zentask-api.onrender.com`). Copy this!*

---

## 3. Frontend: Vercel

Vercel is optimized for Vite/React apps.

1.  **Prepare Code**:
    *   Open `frontend/.env` (or create it locally if missing for testing) and ensure your code uses the variable `import.meta.env.VITE_API_URL`.
    *   *Important*: You likely need to check your `api.js` or `authService.js` to ensure they use this variable instead of hardcoded `http://localhost:5000`.
2.  **Sign Up**: Log in to [Vercel](https://vercel.com/) with GitHub.
3.  **Add New Project**: Click **Add New** -> **Project**.
4.  **Import Repo**: Select `habit-tracker`.
5.  **Configure Project**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: Click **Edit** and select `frontend`.
6.  **Environment Variables**:
    *   Add `VITE_API_URL`.
    *   Value: Your Render Backend URL (e.g., `https://zentask-api.onrender.com/api`).
    *   *Note: Ensure you include `/api` if your frontend service calls expect it, or just the base domain if the code appends `/api`.*
7.  **Deploy**: Click **Deploy**.

---

## 4. Final Polish

1.  **CORS (Important)**:
    *   Go back to your **Backend code** (`server.js`).
    *   Ensure your CORS configuration allows the new Vercel frontend domain.
    *   Update `cors({ origin: 'https://your-vercel-app.vercel.app' })` or use `*` temporarily for testing.
    *   Push this change to GitHub; Render will auto-deploy.

**You are now live!** 🚀
