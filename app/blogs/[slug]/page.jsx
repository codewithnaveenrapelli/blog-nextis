import { assets } from '@/Assets/assets'
import Footer from '@/Components/Footer'
import Image from 'next/image'
import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";


const ReadingProgress = dynamicImport(() => import("@/Components/ReadingProgress"), { ssr: false });
const TableOfContents = dynamicImport(() => import("@/Components/TableOfContents"), { ssr: false });


// fetch blog
async function getBlog(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?slug=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data || null;
}

export default async function page({ params }) {

  const data = await getBlog(params.slug);

  // 🚨 IMPORTANT: if blog not found
  if (!data) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="text-gray-500 mt-4">The blog you are looking for does not exist.</p>
      </div>
    );
  }

  // reading time calculation SAFE
  const text = data.description?.replace(/<[^>]*>/g, '') || "";
  const words = text.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <>
      <ReadingProgress />

      {/* HEADER */}
      <div className='max-w-3xl mx-auto px-5 pt-14 text-center'>
        <p className='text-sm text-gray-500 uppercase tracking-wide'>{data.category}</p>

        <h1 className='text-3xl sm:text-5xl font-bold mt-4 leading-tight'>
          {data.title}
        </h1>

        <div className='flex items-center justify-center gap-3 mt-6 text-gray-600'>
          <Image className='rounded-full' src={data.authorImg} width={40} height={40} alt='' />
          <span>{data.author}</span>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className='max-w-4xl mx-auto px-5 mt-10'>
        <Image className='rounded-xl w-full h-auto' src={data.image} width={900} height={500} alt='' />
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-5 py-12 flex gap-12 items-start">
        <article className='flex-1 min-w-0'>
          <div
            className='prose lg:prose-lg max-w-none blog-content'
            dangerouslySetInnerHTML={{
              __html: data.description.replace(
                /<h([1-6])>(.*?)<\/h\1>/g,
                (match, level, text) => {
                  const id = text
                    .toLowerCase()
                    .replace(/<[^>]*>/g, "")
                    .replace(/[^a-z0-9\s]/g, "")
                    .trim()
                    .replace(/\s+/g, "-");

                  return `<h${level} id="${id}">${text}</h${level}>`;
                }
              )
            }}
          />

        </article>

        <TableOfContents />
      </div>

    </>
  );
}
