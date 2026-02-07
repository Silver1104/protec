import dotenv from 'dotenv';
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Temporary debug line

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/auth.js';
import choiceRoutes from './routes/choices.js';
import bearRoutes from './routes/bear.js';
import promiseRoutes from './routes/promises.js';
import hugRoutes from './routes/hugs.js';
import puzzleRoutes from './routes/puzzle.js';
import videoRoutes from './routes/videos.js';
import stressRoutes from './routes/stress.js';
import photoRoutes from './routes/photos.js';
import datePlanRoutes from './routes/datePlan.js';
import aimScoreRoutes from './routes/aimScore.js';
import periodRoutes from './routes/period.js';
import adminRoutes from './routes/admin.js';

connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/choices', choiceRoutes);
app.use('/api/bear', bearRoutes);
app.use('/api/promises', promiseRoutes);
app.use('/api/hugs', hugRoutes);
app.use('/api/puzzle', puzzleRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/stress', stressRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/dateplan', datePlanRoutes);
app.use('/api/aimscore', aimScoreRoutes);
app.use('/api/period', periodRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
