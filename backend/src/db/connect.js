"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
async function connectToDatabase() {
    if (isConnected && mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default;
    }
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
        console.warn('[MongoDB] MONGODB_URI is not defined in environment variables. Database operations will fail until configured.');
        throw new Error('Database configuration missing. MONGODB_URI must be set.');
    }
    try {
        const db = await mongoose_1.default.connect(mongodbUri, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log(`[MongoDB] Successfully connected to database: ${db.connection.name}`);
        return db;
    }
    catch (error) {
        isConnected = false;
        console.error('[MongoDB] Connection error occurred:', error.message || 'Unknown database connection error');
        throw new Error('Failed to connect to MongoDB Atlas database');
    }
}
//# sourceMappingURL=connect.js.map