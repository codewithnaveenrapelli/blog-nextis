import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function ConnectDB() {

  if (cached.conn) return cached.conn;

  if (!process.env.MONGODB_URI) {
    console.warn("MongoDB URI missing at build time (safe to ignore)");
    return null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: "practicaltechguide",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
