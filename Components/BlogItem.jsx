import Link from "next/link";

export default function BlogItem({ id, slug, title, description, category, image }) {

  // fallback for old blogs (important)
  const url = slug ? `/blogs/${slug}` : `/blogs/${id}`;

  const cleanText = description?.replace(/<[^>]*>/g, '').slice(0, 140);

  return (
    <article className="bg-white rounded-xl overflow-hidden border hover:shadow-xl transition duration-300 h-full flex flex-col group">

      {/* Image */}
      <Link href={url} className="overflow-hidden block">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
        />
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">

        {/* Category */}
        <Link
          href={`/category/${category?.toLowerCase()}`}
          className="text-xs uppercase tracking-wider text-gray-500 hover:text-black"
        >
          {category}
        </Link>

        {/* Title */}
        <Link href={url}>
          <h3 className="text-lg font-semibold mt-2 leading-snug group-hover:text-black">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 mt-3 text-sm flex-1">
          {cleanText}...
        </p>

        {/* Read more */}
        <Link href={url} className="mt-6 font-medium text-sm text-black">
          Read article →
        </Link>

      </div>
    </article>
  );
}
