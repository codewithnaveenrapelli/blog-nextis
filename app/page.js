import BlogList from "@/Components/BlogList";
import FeaturedPost from "@/Components/FeaturedPost";
import Footer from "@/Components/Footer";
import Link from "next/link";
import Newsletter from "@/Components/Newsletter";
export const dynamic = "force-dynamic";
// server fetch
async function getBlogs() {
 fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""}/api/blog`, {
  cache: "no-store"
})

  const data = await res.json();
  return data.blogs || [];
}

// ⭐ ensures old posts (without slug) still work
function normalizeBlogs(blogs) {
  return blogs.map((blog) => ({
    ...blog,
    slug: blog.slug || blog._id,
  }));
}

export default async function Home() {

  const rawBlogs = await getBlogs();
  const blogs = normalizeBlogs(rawBlogs);

  let featured = null;
  let latestBlogs = [];

  if (blogs.length === 0) {
    latestBlogs = [];
  }
  else if (blogs.length === 1) {
    featured = blogs[0];
    latestBlogs = blogs;
  }
  else {
    featured = blogs[0];
    latestBlogs = blogs.slice(1, 7);
  }

  return (
    <>
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center text-white">
        <div className="absolute inset-0">
          <img src="/hero-bg.jpg" alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="uppercase tracking-widest text-sm text-gray-300">
              Adobe Experience Manager Developer
            </p>

            <h1 className="mt-4 text-4xl sm:text-6xl font-bold leading-tight">
              Learn Java & AEM
              <span className="block text-gray-300">Through Real Development Work</span>
            </h1>

            <p className="mt-6 text-gray-200 text-lg">
              I document real debugging sessions, architecture decisions, and implementation
              details while building real-world AEM projects — not tutorial theory.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link href="/blog" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
                Start Learning
              </Link>

              <Link href="/portfolio" className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition">
                See My Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      {featured && <FeaturedPost post={featured} />}

      {/* LATEST ARTICLES */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <p className="text-gray-600 mt-2">
            Recent learnings and implementation breakdowns
          </p>
        </div>

        <BlogList blogs={latestBlogs} />
      </section>

      <Newsletter />
    </>
  );
}
