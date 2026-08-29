import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    console.warn('[MongoDB] MONGODB_URI is not defined in environment variables. Database operations will fail until configured.');
    throw new Error('Database configuration missing. MONGODB_URI must be set.');
  }

  try {
    const db = await mongoose.connect(mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`[MongoDB] Successfully connected to database: ${db.connection.name}`);
    return db;
  } catch (error: any) {
    isConnected = false;
    console.error('[MongoDB] Connection error occurred:', error.message || 'Unknown database connection error');
    throw new Error('Failed to connect to MongoDB Atlas database');
  }
}
