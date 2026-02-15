import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { getPaginatedBlogs } from "@/lib/data/blogs";

/* ------------------------------------------------ */
/* GET SINGLE BLOG */
/* ------------------------------------------------ */

export async function getBlogBySlug(slug) {
  await ConnectDB();

  // 1️⃣ try slug
  let blog = await BlogModel.findOne({ slug }).lean();

  // 2️⃣ fallback for old posts using _id
  if (!blog && slug?.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await BlogModel.findById(slug).lean();
  }

  if (!blog) return null;

  // convert _id → string (important for Next serialization)
  blog._id = blog._id.toString();

  return blog;
}

/* ------------------------------------------------ */
/* PAGINATION */
/* ------------------------------------------------ */

export async function getPaginatedBlogs(page = 1, limit = 6) {
  await ConnectDB();

  const skip = (page - 1) * limit;

  const total = await BlogModel.countDocuments();

  const blogs = await BlogModel.find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  // serialize ObjectId
  const serializedBlogs = blogs.map((b) => ({
    ...b,
    _id: b._id.toString(),
    slug: b.slug || b._id.toString(),
  }));

  return {
    blogs: serializedBlogs,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

/* ------------------------------------------------ */
/* ALL BLOGS */
/* ------------------------------------------------ */

export async function getAllBlogs() {
  await ConnectDB();

  const blogs = await BlogModel.find({}).sort({ _id: -1 }).lean();

  return blogs.map((b) => ({
    ...b,
    _id: b._id.toString(),
    slug: b.slug || b._id.toString(),
  }));
}
