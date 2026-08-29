"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("@clerk/express");
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const tripPlanRoutes_1 = __importDefault(require("./routes/tripPlanRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const connect_1 = require("./db/connect");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Initialize MongoDB Connection asynchronously
(0, connect_1.connectToDatabase)().catch((err) => {
    console.warn('[Server Startup] Initial database connection attempt failed:', err.message);
});
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Clerk authentication middleware for Express API routes
const clerkPubKey = process.env.CLERK_PUBLISHABLE_KEY?.trim();
const clerkSecKey = process.env.CLERK_SECRET_KEY?.trim();
if (clerkPubKey && clerkSecKey) {
    app.use((0, express_2.clerkMiddleware)({
        publishableKey: clerkPubKey,
        secretKey: clerkSecKey,
    }));
}
else {
    console.log('[Server Startup] Clerk keys missing in backend .env. Operating in placeholder mode until keys are provided.');
    // Optional lightweight dummy auth middleware when Clerk keys are placeholders
    app.use((req, _res, next) => {
        req.auth = { userId: null, sessionClaims: {} };
        next();
    });
}
// Routes
app.use('/api/bookings', bookingRoutes_1.default);
app.use('/api/trip-plans', tripPlanRoutes_1.default);
app.use('/api', blogRoutes_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'OSHĪ Backend API is running' });
});
exports.default = app;
//# sourceMappingURL=app.js.map