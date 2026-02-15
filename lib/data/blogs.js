import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

export async function getAllBlogs(page = 1, limit = 6) {
  await ConnectDB();

  const skip = (page - 1) * limit;

  const total = await BlogModel.countDocuments();
  const blogs = await BlogModel.find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    blogs: JSON.parse(JSON.stringify(blogs)),
    totalPages: Math.ceil(total / limit),
  };
}

export async function getBlogBySlug(slug) {
  await ConnectDB();

  let blog = await BlogModel.findOne({ slug }).lean();

  // fallback for old ids
  if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await BlogModel.findById(slug).lean();
  }

  return JSON.parse(JSON.stringify(blog));
}
