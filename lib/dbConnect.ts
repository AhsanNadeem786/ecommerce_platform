import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  const errorMsg = "MONGODB_URI is not configured. Please set it in your environment variables.";
  console.error("[DB_CONNECT]", errorMsg);
  // Don't throw immediately - let the API routes handle it
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {
  // Check if URI is available
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not configured. Please check your environment variables in Vercel/your deployment platform."
    );
  }

  if (cached.conn) {
    console.log("[DB_CONNECT] Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("[DB_CONNECT] Creating new MongoDB connection...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // Vercel-specific optimizations
        maxPoolSize: 10,
        minPoolSize: 2,
      })
      .then((mongoose) => {
        console.log("[DB_CONNECT] MongoDB connection established successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("[DB_CONNECT] MongoDB connection failed:", {
          message: error?.message,
          code: error?.code,
        });
        cached.promise = null; // Reset promise on error
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset on error
    throw error;
  }

  return cached.conn;
}

export default dbConnect;