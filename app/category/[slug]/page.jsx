import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import { headers } from "next/headers";

// fetch blogs (server safe)
async function getBlogs() {

  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/blog`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.blogs || [];
}

export default async function CategoryPage({ params }) {

  const blogs = await getBlogs();

  const filtered = blogs.filter(
    (b) => b.category?.toLowerCase() === params.slug.toLowerCase()
  );

  return (
    <>
      {/* Header */}
      <section className="bg-black text-white py-20 text-center">
        <h1 className="text-4xl font-bold capitalize">
          {params.slug} Articles
        </h1>
        <p className="text-gray-300 mt-4">
          All posts related to {params.slug}
        </p>
      </section>

      {/* Blog list */}
      <section className="bg-gray-50 py-16">
        <BlogList blogs={filtered} />
      </section>
    </>
  );
}
