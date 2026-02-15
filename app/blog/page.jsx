import BlogList from "@/Components/BlogList";
import { getPaginatedBlogs } from "@/lib/data/blogs";
export const dynamic = "force-dynamic";

export default async function BlogPage({ searchParams }) {

  const page = Number(searchParams?.page || 1);

  // 🔥 DIRECT DB CALL (no fetch)
  const { blogs, totalPages, currentPage } = await getPaginatedBlogs(page, 6);

  return (
    <>
      {/* Header */}
      <section className="bg-white py-20 text-center">
        <h1 className="text-4xl font-bold">All Articles</h1>
        <p className="text-gray-600 mt-4">
          Practical learning notes and real-world debugging experiences
        </p>
      </section>

      {/* Blog List */}
      <section className="bg-gray-50 py-16">
        <BlogList
          blogs={blogs}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </section>

    </>
  );
}
