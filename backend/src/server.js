import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import habitRoutes from './routes/habitRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
