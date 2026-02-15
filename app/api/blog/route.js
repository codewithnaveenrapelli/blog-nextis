import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import sanitizeHtml from "sanitize-html";
export const dynamic = "force-dynamic";
// 🔗 generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// 🔗 ensure unique slug
async function createUniqueSlug(title) {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (await BlogModel.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}

// ================= GET =================
export async function GET(request) {
  await ConnectDB();

  const slug = request.nextUrl.searchParams.get("slug");
  const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
  const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 6;

 // Single blog
if (slug) {

  // 1️⃣ Try slug first
  let blog = await BlogModel.findOne({ slug });

  // 2️⃣ Fallback: maybe old post using _id
  if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await BlogModel.findById(slug);
  }

  return NextResponse.json(blog);
}


  // pagination
  const skip = (page - 1) * limit;

  const total = await BlogModel.countDocuments();
  const blogs = await BlogModel.find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  return NextResponse.json({
    blogs,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  });
}

// ================= POST =================
export async function POST(request) {
  await ConnectDB();

  const formData = await request.formData();
  const timestamp = Date.now();

  // -------- image handling --------
  const image = formData.get("image");

  if (!image || !image.name) {
    return NextResponse.json(
      { success: false, msg: "Image is required" },
      { status: 400 }
    );
  }

  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);

  const fileName = `${timestamp}_${image.name}`;
  const path = `./public/${fileName}`;

  await writeFile(path, buffer);
  const imgUrl = `/${fileName}`;

  // -------- sanitize content --------
  const cleanDescription = sanitizeHtml(formData.get("description"), {
    allowedTags: [
      "p","b","i","em","strong","a","ul","ol","li",
      "h1","h2","h3","h4","h5","h6","blockquote",
      "code","pre","br","hr","img"
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt"]
    },
    allowedSchemes: ["http","https","mailto"]
  });

  // ⭐ generate unique slug
  const slug = await createUniqueSlug(formData.get("title"));

  const blogData = {
    title: formData.get("title"),
    slug,
    description: cleanDescription,
    category: formData.get("category"),
    author: formData.get("author"),
    image: imgUrl,
    authorImg: formData.get("authorImg"),
  };

  await BlogModel.create(blogData);

  return NextResponse.json({
    success: true,
    msg: "Blog Added",
    slug
  });
}

// ================= DELETE =================
export async function DELETE(request) {
  await ConnectDB();

  const id = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  // remove image
  if (blog?.image) {
    fs.unlink(`./public${blog.image}`, () => {});
  }

  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({ success: true, msg: "Blog Deleted" });
}
