# Deployment Guide: Free Hosting for ZenTask

This guide is specifically tailored for your **ZenTask (habit-tracker)** repository.

**Project Structure:**
*   **Backend**: Located in `backend/` | Runs on **Render**
*   **Frontend**: Located in `frontend/` | Runs on **Vercel**
*   **Database**: **MongoDB Atlas**

---

## 1. Database: MongoDB Atlas (Cloud DB)

1.  **Log in** to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  **Create a Cluster**: Select the **Shared (Free)** tier.
3.  **Database Access**:
    *   Create a user (e.g., `zentask_admin`).
    *   **Password**: Generate a strong password and **COPY IT** immediately.
4.  **Network Access**:
    *   Click **Add IP Address** -> **Allow Access from Anywhere** (`0.0.0.0/0`).
5.  **Get Connection String**:
    *   Click **Connect** -> **Drivers** -> **Node.js**.
    *   Copy the URI: `mongodb+srv://zentask_admin:<password>@cluster...`

---

## 2. Backend Hosting: Render

1.  **Log in** to [Render.com](https://render.com/) using your GitHub account.
2.  **New Web Service**: Click **New +** -> **Web Service**.
3.  **Select Repository**: Choose `habit-tracker`.
4.  **Configure Service**:
    *   **Name**: `zentask-api` (or similar)
    *   **Root Directory**: `backend` (Crucial: tells Render where package.json is)
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start` (Verified: runs `node src/server.js`)
5.  **Environment Variables** (Scroll down):
    *   `NODE_ENV` = `production`
    *   `MONGODB_URI` = *Paste your Atlas URI (replace <password> with actual password)*
    *   `JWT_SECRET` = *Enter a secure random string (e.g., long-random-text)*
6.  **Deploy**: Click **Create Web Service**.
    *   *Copy the URL provided by Render (e.g., `https://zentask-api.onrender.com`).*

---

## 3. Frontend Hosting: Vercel

1.  **Log in** to [Vercel.com](https://vercel.com/) using GitHub.
2.  **Add New Project**: Click **Add New** -> **Project**.
3.  **Import Repository**: Select `habit-tracker`.
4.  **Configure Project**:
    *   **Framework Preset**: Vite (Vercel should auto-detect this).
    *   **Root Directory**: Click **Edit** and select `frontend`.
5.  **Build Settings** (Default is usually correct):
    *   *Build Command*: `vite build`
    *   *Output Directory*: `dist`
6.  **Environment Variables**:
    *   **Name**: `VITE_API_URL`
    *   **Value**: Your Render Backend URL + `/api` (e.g., `https://zentask-api.onrender.com/api`)
7.  **Deploy**: Click **Deploy**.

---

## 4. Final Configuration

**Update CORS on Backend:**
Once your Vercel site is live (e.g., `https://habit-tracker-zeta.vercel.app`), you must allow it to talk to your backend.

1.  Open `backend/src/server.js` locally.
2.  Find the `cors` configuration.
3.  Update it to allow your Vercel domain:
    ```javascript
    app.use(cors({
        origin: ['https://habit-tracker-zeta.vercel.app', 'http://localhost:5173'],
        credentials: true
    }));
    ```
4.  Commit and Push. Render will auto-redeploy with the new settings.

**Success! Your ZenTask MERN app is now live.** 🚀
