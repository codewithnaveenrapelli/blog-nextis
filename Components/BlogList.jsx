"use client";

import { useMemo, useState, useEffect } from "react";
import BlogItem from "./BlogItem";
import SearchBar from "./SearchBar";

const BlogList = ({ blogs = [], currentPage = 1, totalPages = 1 }) => {

  const [selected, setSelected] = useState("All");
  const [displayBlogs, setDisplayBlogs] = useState([]);

  // important: keep state synced when server sends blogs
  useEffect(() => {
    setDisplayBlogs(blogs);
  }, [blogs]);

  // 🔥 dynamic categories from blogs
  const categories = useMemo(() => {
    const unique = [...new Set(blogs.map((b) => b.category))];
    return unique.filter(Boolean);
  }, [blogs]);

  // category filter
  const categoryFiltered =
    selected === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selected);

  // final blogs to render
  const filteredBlogs =
    displayBlogs.length !== blogs.length
      ? displayBlogs
      : categoryFiltered;

  return (
    <div>

      {/* SEARCH */}
      <SearchBar blogs={blogs} onResults={setDisplayBlogs} />

      {/* CATEGORY FILTERS */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 my-12 px-4">

          <button
            onClick={() => {
              setSelected("All");
              setDisplayBlogs(blogs);
            }}
            className={`px-4 py-2 rounded-full text-sm transition ${selected === "All"
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelected(cat);
                setDisplayBlogs(blogs);
              }}
              className={`px-4 py-2 rounded-full text-sm transition ${selected === cat
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}

        </div>
      )}

      {/* BLOG GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              slug={item.slug}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />

          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No articles found.
          </p>
        )}
      </div>
      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-16 flex-wrap px-6">

          {/* Previous */}
          {currentPage > 1 && (
            <a
              href={`/blog?page=${currentPage - 1}`}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 text-sm"
            >
              ← Prev
            </a>
          )}

          {/* Numbers */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;

            return (
              <a
                key={page}
                href={`/blog?page=${page}`}
                className={`px-4 py-2 rounded-md border text-sm transition
          ${currentPage === page
                    ? "bg-black text-white border-black"
                    : "hover:bg-gray-100"
                  }`}
              >
                {page}
              </a>
            );
          })}

          {/* Next */}
          {currentPage < totalPages && (
            <a
              href={`/blog?page=${currentPage + 1}`}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 text-sm"
            >
              Next →
            </a>
          )}

        </div>
      )}


    </div>
  );
};

export default BlogList;
