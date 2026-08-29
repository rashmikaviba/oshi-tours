import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import bookingRoutes from './routes/bookingRoutes';
import tripPlanRoutes from './routes/tripPlanRoutes';
import blogRoutes from './routes/blogRoutes';
import { connectToDatabase } from './db/connect';

dotenv.config();

const app = express();

// Initialize MongoDB Connection asynchronously
connectToDatabase().catch((err) => {
  console.warn('[Server Startup] Initial database connection attempt failed:', err.message);
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk authentication middleware for Express API routes
const clerkPubKey = process.env.CLERK_PUBLISHABLE_KEY?.trim();
const clerkSecKey = process.env.CLERK_SECRET_KEY?.trim();

if (clerkPubKey && clerkSecKey) {
  app.use(
    clerkMiddleware({
      publishableKey: clerkPubKey,
      secretKey: clerkSecKey,
    })
  );
} else {
  console.log('[Server Startup] Clerk keys missing in backend .env. Operating in placeholder mode until keys are provided.');
  // Optional lightweight dummy auth middleware when Clerk keys are placeholders
  app.use((req, _res, next) => {
    (req as any).auth = { userId: null, sessionClaims: {} };
    next();
  });
}

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/trip-plans', tripPlanRoutes);
app.use('/api', blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'OSHĪ Backend API is running' });
});

export default app;
