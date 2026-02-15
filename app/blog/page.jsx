import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
export const dynamic = "force-dynamic";
// fetch paginated blogs
async function getBlogs(page) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?page=${page}&limit=6`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function BlogPage({ searchParams }) {

  const page = Number(searchParams.page || 1);

  const data = await getBlogs(page);

  const blogs = data.blogs || [];
  const totalPages = data.totalPages || 1;
  const currentPage = data.currentPage || 1;

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
