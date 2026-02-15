import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

export async function GET() {
  await ConnectDB();

  const blogs = await BlogModel.find({}, "category");

  const categories = [...new Set(blogs.map(b => b.category))];

  return NextResponse.json({ categories });
}
