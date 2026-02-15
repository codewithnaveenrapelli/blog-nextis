import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

/* ------------------------------------------------ */
/* SINGLE BLOG */
/* ------------------------------------------------ */

export async function getBlogBySlug(slug) {
  await ConnectDB();

  let blog = await BlogModel.findOne({ slug }).lean();

  if (!blog && slug?.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await BlogModel.findById(slug).lean();
  }

  if (!blog) return null;

  blog._id = blog._id.toString();
  blog.slug = blog.slug || blog._id;

  return blog;
}

/* ------------------------------------------------ */
/* PAGINATED BLOGS */
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

  const blogs = await BlogModel.find({})
    .sort({ _id: -1 })
    .lean();

  return blogs.map((b) => ({
    ...b,
    _id: b._id.toString(),
    slug: b.slug || b._id.toString(),
  }));
}
