import mongoose from "mongoose";

let isConnected = false;

export async function ConnectDB() {

  if (isConnected) return;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing in environment variables");
  }

  try {
    await mongoose.connect(uri, {
      dbName: "practicaltechguide",
    });

    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
