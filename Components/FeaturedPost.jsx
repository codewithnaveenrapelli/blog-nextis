import Link from "next/link";

export default function FeaturedPost({ post }) {

  if (!post) return null;

  // slug fallback support
  const url = post.slug ? `/blogs/${post.slug}` : `/blogs/${post._id}`;

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-10">Featured Article</h2>

        <div className="relative rounded-2xl overflow-hidden group">

          {/* Image */}
          <Link href={url}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
            />
          </Link>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 p-8 text-white max-w-3xl">

            <Link
              href={`/category/${post.category.toLowerCase()}`}
              className="uppercase text-xs tracking-widest text-gray-300 hover:text-white"
            >
              {post.category}
            </Link>

            <h3 className="text-2xl sm:text-4xl font-bold mt-3 leading-tight">
              {post.title}
            </h3>

            <p className="mt-4 text-gray-200 line-clamp-2">
              {post.description?.replace(/<[^>]*>/g, '').slice(0, 160)}...
            </p>

            <Link
              href={url}
              className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Read Article →
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
